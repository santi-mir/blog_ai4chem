# Atoms Vectors - SkipAtom

[Atom2Vec] was already described, now it's time for [SkipAtom].

## Summary

This paper proposes a method to create atom embeddings (SkipAtom), and compares a few things:

- Predictions concatenating vectors (no pooling) vs other methods:
    - These should hint about the embedding quality.
    - In elpasolite-task; SkipAtom wins here.
- Predictions across embedding-methods and pooling-methods (9 prediction tasks)
    - Sum and Mean Pooling outperform Max Pooling
    - Mat2Vec does best, and second Skip Vector.
    - Bag of Atoms (sum pool of hot enc) does best in one task
- The results against state of the art methods.
    - Showing these methods can be useful when no structural info is available.

## Method

First, compounds are downloaded. Then, the Voronoi Decomposition is used to derive graphs from unit-cells, and from the graphs generate training-pairs. As they show in the paper:

<div class="center w40">
    <a href="./assets/distributed_reps_dataset_gen.png">
        <img src="./assets/distributed_reps_dataset_gen.png" alt="Using formula and Voronoi Decomposition to build a crystal-graph"/>
    </a>
    <p>
    Image from <a href="https://www.nature.com/articles/s41524-022-00729-3">Original Paper</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-SA 4.0</a>
    </p>
</div>

Finally, these pairs are used to train a shallow network to predict the pair-target from the pair-reference.

<div class="center w40">
    <a href="./assets/shallow_net.png">
        <img src="./assets/shallow_net.png" alt="Shallow network used to create the embeddings. It consists of a projection matrix, followed by a 'prediction' matrix."/>
    </a>
    <p>
    Image from <a href="https://www.nature.com/articles/s41524-022-00729-3">Original Paper</a> (slightly modified) under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-SA 4.0</a>
    </p>
</div>

- The resulting representation is dense and structured/semantic. This can be shown using dimensionality reduction techniques (PCA, t-SNE,..)
- The architecture is described as:
    > (...) single hidden layer with linear activation, whose size depended on the desired dimensionality of the learned embeddings, and an output layer with 86 neurons (one for each of the utilized atom types) with softmax activation. (...) minimizing the cross-entropy loss between the predicted context atom probabilities and the one-hot vector representing the context atom, given the one-vector representing the target atom as input.

## Representations of Compounds (Pooling)

The analogy to NLP is that _words are like atoms_, and _sentences are like compounds_. Hence, distributed representations of atoms can be combined (pooled) into a vector representing a compound.

Vector-pooling options are:

- _sum_: $\sum s_i \vec{a}_i$ where $s_i$ is the stoichiometry (can be fractional),
- _mean_: $\frac{\sum s_i \vec{a}_i}{\sum s_i}$, i.e. divided by total number of atoms (can be fractional too).
- _max_: $\mathrm{max}(M_i)$, reduces material matrix $\mathrm{M}$ to vector. Selects max value of each column, each row being an atom in the compound.

The resulting compound representation is then used for training a feed-forward NN on different tasks. Also benchmarked using MatBench.

The pooling can also be done with hot-encoded vectors for atoms. This is done in [ElemNet] (mean pooling), and in Bag-of-atoms (sum pooling). The advantage: no training required, the disadvantage: the result is a _sparse_ vector, and _can_ be less accurate.

[Atom2Vec]: https://arxiv.org/pdf/1807.05617
[SkipAtom]: https://www.nature.com/articles/s41524-022-00729-3.pdf
[ElemNet]: https://www.nature.com/articles/s41598-018-35934-y
