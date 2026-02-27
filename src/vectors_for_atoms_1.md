# Vectors for atoms

These are some of my opinions and ideas after reading the "[Atom2Vec][PNAS]" (2018) and "[SkipAtom][Nature]" (2022) papers.

-----------

## Background

Around 2014, Mikolov et. al. proposed an algorithm for machine-learning vector representations of words.

The insight was to encode information about the word's environment (neighbouring words). The vector space had similar word clustered together, and these vectors became useful for downstream tasks.

By exploiting the analogy that _words are to sentences what to atoms are to compounds_, computational chemists have built upon these findings.

## Introduction in Chemistry

Atom vectors can be _built_ from empirical features or they can be _learnt_ by an algorithm. Selecting descriptors is tedious, need to be designed for each particular task, and may be less accurate. So the automated approach, with more general-purpose vectors, has won in popularity.

> [!NOTE]
> "Empirical features" refers to the group and period (but also potentially many others like charge, mass, ..). This was widely used prior to 2018, before the automated ones.

Both _Atom2Vec_ and _SkipAtom_ are unsupervised algorithms that obtain their atom vectors from compound-databases. Atom vectors can be combined into compound vectors, and used for downstream tasks like property-prediction.

These approaches compete with others that use crystal-structure information, but are computationally cheaper.

Let's see how each algorithm obtains the atom vectors.

## Atom2Vec

In the table below, each row is the atom's connection to groups, `1`s represent Atom-Group link, `0`s no link.

|  |(2)Sb3|(2)Se3|(2)Te3|(3)Bi2|(3)Sb2|(3)O2|(3)S2|
| ----          | ---- | -----|------|------|------|-----|-----|
| Bi| 1 | 1 |1|0|0|1 | 0 |
| Sb | 0 | 1 |1|1|0|0 | 1 |
| ... | 0 | 0 |1|0|0|1 | 1 |

The index `(N)` is the stoichiometry of the atom in the compound $\mathrm{Bi_2Sb_3}$ for the first column.

Each atom-vector is very sparse, since a particular atom binds to a small fraction of all groups. Similar atoms have similar vectors.

They proposed two models but explain the best performing one called "Model-free machine". In this model, a matrix like the above is SVD'ed, and the $d$-rows with the largest singular values are extracted.

They find:

- Similar atoms, similar vectors i.e. clustered nearby in the high-dimensional vector space.
- They run a hierarchical clustering algorithm (based on a simple distance metric), and the grouping is also interesting.
- Looking at the variation of some dimensions, we can assign meaning to some of them.

Then, they compared to "empirical features" &mdash; a vector `(group, period,...)`, randomly padded to match their $d$&mdash;, with the task of predicting the DFT-found formation-energies of $\approx 10^4$ elpasolite crystals ($\mathrm{ABC_2D_6}$). They represent each solid as a concatenation of atom vectors, and feed it to a hidden layer. (They also do other tasks.)

The paper ends with an interesting insight:

> Structural information has to be taken into account to accurately model how atoms are bound together to form either environment or compound, where the recent development on recursive and graph-based neural networks might help.

## SkipAtom

First, compounds are downloaded, then the atom-pairs-dataset is generated. The Voronoi Decomposition helps derive training-pairs from the unit cell. This is shown in the image below:

<div class="center w40">
    <a href="./assets/distributed_reps_dataset_gen.png">
        <img src="./assets/distributed_reps_dataset_gen.png" alt="Using formula and Voronoi Decomposition to build a crystal-graph"/>
    </a>
    <p>
    Image from <a href="https://www.nature.com/articles/s41524-022-00729-3">Original Paper</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-SA 4.0</a>
    </p>
</div>

Next, use the dataset for training a shallow network, trained to predict the neighbour-pair. Visually, it looks like this:

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

[Nature]: https://www.nature.com/articles/s41524-022-00729-3
[PNAS]: https://pnas.org/doi/full/10.1073/pnas.1801181115
