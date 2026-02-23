# Learning embeddings for atoms

These are some of my opinions and ideas after reading [Distributed representations of atoms and materials for
machine learning][Nature] (2022).

-----------

## Summary

The paper proposes **SkipAtom**, an unsupervised-learning approach to learn atom-embeddings, inspired by Skip-gram (an NLP algorithm to generate word embeddings).

* In Skip-gram, hot-encoded words are projected onto a dense, lower-dimensional vector, which is then decoded into another word.

* In SkipAtom, hot-encoded atoms are projected instead, and is decoded into the neighbour-atom.

Compound embeddings can be created by combining atom-emdeddings, then used for property prediction neural networks (NNs) and other tasks.

> With compound representations consisting of composition information alone results in competitive performance when comparing to approaches that make use of structural information.


## High-Level procedure

First, compounds are downloaded, then the atom-pairs-dataset is generated. The Voronoi Decomposition helps derive training-pairs from the unit cell. This is shown in the image below:

<div class="center w320">
    <a href="./assets/distributed_reps_dataset_gen.png">
        <img src="./assets/distributed_reps_dataset_gen.png" alt="Using formula and Voronoi Decomposition to build a crystal-graph"/>
    </a>
    <p>
    Image from <a href="https://www.nature.com/articles/s41524-022-00729-3">Original Paper</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-SA 4.0</a>
    </p>
</div>

Next, use the dataset for training a shallow network:

```mermaid
---
config:
    flowchart:
        htmlLabels: false
---
flowchart LR
        D("`Hot-encode atoms
            (sparse)`")
        E("Minimise Log-Probability")
        F("`Extract Embeddings
            (dense)`")
        D --"`**Train
            CrossEntropy(y, y')**`"--> E
        E --> F
```

The shallow net is trained to predict the neighbour-pair. Visually, it looks like this:

<div class="center w320">
    <a href="./assets/shallow_net.png">
        <img src="./assets/shallow_net.png" alt="Shallow network used to create the embeddings. It consists of a projection matrix, followed by a 'prediction' matrix."/>
    </a>
    <p>
    Image from <a href="https://www.nature.com/articles/s41524-022-00729-3">Original Paper</a> (slightly modified) under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-SA 4.0</a>
    </p>
</div>


* The resulting representation is dense and structured/semantic. This can be shown using dimensionality reduction techniques (PCA, t-SNE,..)
* The architecture is described as:
    > (...) single hidden layer with linear activation, whose size depended on the desired dimensionality of the learned embeddings, and an output layer with 86 neurons (one for each of the utilized atom types) with softmax activation. (...) minimizing the cross-entropy loss between the predicted context atom probabilities and the one-hot vector representing the context atom, given the one-vector representing the target atom as input.

## Distributed Representations of Atoms

In this context, distributed representations are just vectors for atoms or compounds. They can be continuous or discrete, sparse or dense.[^1]

Which ways are there to create vector-representations of atoms?

| Random | One-Hot | Atom2Vec | Mat2Vec | SkipAtom|
|--------|---------|----------|---------|----------|
| From Random Distributions  | One 1, rest 0s | SVD of Co-Occurence Matrix      | Embedding (Word2Vec)| Embedding (Skip-gram) |
| $(0.4,\ldots,0.6)$ | $(0,\ldots,1,\ldots,0)$| as random | as random | as random |
|dense|sparse|sparse|dense|dense|

### Comments

* **Atom2Vec**: any matrix (square or not) has SVD; but does this improves over co-occurences vector?
* **Mat2Vec**: The projection matrix, initially random, ends up storing embeddings.
    * Task: context-words predict centre-word. Example: `The cat ___ on the mat.`
* **SkipAtom**: In the same paper of Word2Vec there is the Skip-gram algorithm, which is adapted for chemistry in this paper.
    * Task: centre-word predicts context-words. Example: `___ ___ sat __ ___ ____` (same sentence).

### Embeddings

Embeddings are vectors in real ($R^n$) non-random vector-space, representing an object. _Real_ here implies continuous.

Not all vector or distributed representations are embeddings.

For embeddings, similar objects have similar vectors, according to some metric.

### Representations of Compounds (Pooling)

The analogy to NLP is that _words are like atoms_, and _sentences are like compounds_. Hence, distributed representations of atoms can be combined (pooled) into a vector representing a compound.

Vector-pooling options are:
* _sum_: $\sum s_i \vec{a}_i$ where $s_i$ is the stoichiometry (can be fractional),
* _mean_: $\frac{\sum s_i \vec{a}_i}{\sum s_i}$, i.e. divided by total number of atoms (can be fractional too).
* _max_: $\mathrm{max}(M_i)$, reduces material matrix $\mathrm{M}$ to vector. Selects max value of each column, each row being an atom in the compound.

The resulting compound representation is then used for training a feed-forward NN on different tasks. Also benchmarked using MatBench.

The pooling can also be done with hot-encoded vectors. This is done in ElemNet (mean pooling), and in Bag-of-atoms (sum pooling). In these cases, the result is a _sparse_ vector.

## Results

### Quality of Atom Representations

One-hot, Random, Atom2Vec, Mat2Vec and SkipAtom compared.

The atom-vectors were _concatenated_ into compound representations, and these used to predict elpasolites (compounds) formation-energy.

SkipAtom outperformed other methods.

### Pooling approaches

Vector pooling strategies were compared through 9 prediction tasks; 5 regressions, 3 classifications and OQMD Formation Energy prediction (also a regression).

* OQDM: bag-of-atoms, which is sum-pooling hot-enc atom vectors, is best.

The rest is summarised well in the paper:

> (...) the models described in this report outperform the existing benchmarks on tasks where only composition is available (namely, the Experimental Band Gap, Bulk Metallic Glass Formation, and Experimental Metallicity tasks). Also, on the Theoretical Metallicity task and the Refractive Index task, the pooled SkipAtom, Mat2Vec and one-hot vector representations perform comparably [to the SOTA], despite making use of composition information only.

And an interesting observation:

> The ElemNet architecture demonstrated (...) Perhaps surprisingly, the combination of a deep feed-forward neural network with compound representations consisting of composition information alone results in competitive performance when comparing to approaches that make use of structural information.

## Use cases and limitations

Training does not rely on labelled data (unsupervised learning).

The model just needs the formula at inference time, and does fine with non-stoichiometric solids. So having the material's composition &mdash;but no structural information&mdash; we can still calculate some properties.

Similar compounds have similar vectors, which is useful. But without structural information, all isomers have the same vector, which is a limitation.

It is computationally cheap, and can help screen large number of compounds as a first selection step.

[Nature]: https://www.nature.com/articles/s41524-022-00729-3
[^1]: This are just my definitions and may be wrong!
