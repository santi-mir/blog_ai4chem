# Learning embeddings for atoms

These are some of my opinions and ideas after reading [Distributed representations of atoms and materials for
machine learning][Nature] (2022).

-----------

## Summary

The paper proposes an unsupervised learning approach to learn atom-embeddings called SkipAtom, in reference to the Skip-gram algorithm.

SkipAtom involves training one atom to predict its most common neighbours.

Combining atom-emdeddings, compound embeddings can be created, which are useful for property prediction neural networks (NNs).

## Use cases

This approach is especially useful when the structure of a compound is unknown. Otherwise, approaches incorporating structural information are more accurate (on average) at most tasks.


## Analogy to Skip-gram

* Skip-gram: Unsupervised learning is project hot-encoded word-tokens to a dense, lower-dimensional vector, then decoding it.

* SkipAtom: Project hot-encoded atoms to a dense, lower-dimensional vector, then decoding it.


The analogies are that _words are like atoms_, and _sentences are like compounds_.

> [!NOTE]
> This approach is attractive because the algorithm is unsupervised i.e. it does not rely on labelled data.

## High-Level procedure

The process they followed is something like:

1. Retrieve crystal structures from a database,
2. Convert each into a graph (paper uses Voronoi decomposition / method for this),
3. Use the graph to generate a database of connected atom pairs A-B (and B-A),
    * Each pair is composed of the input and the output, used for training,
4. Hot-encode each atom (sparse representation),
5. Train a single layer to predict the neighbour's hot-encoded vector given the central atom,
    * Task: minimise the average log-probability (not sure how the vectors are "reduced", is the distance computed, or what?).
6. Result: Each projection-matrix-column is now an atom's embedding.
    * The atom's vector (embedding) is a reflection of the atom's environment.
    * Atoms often found in similar environments should have similar vectors (possibly carbon, oxygen, nitrogen).
    * The representation is now dense and the vector space is ordered/semantic.

<--!
Discussion: Why doesn't it learn just the probabilities for each dimension? One reason is that we have less dimensions, which is handy. Also, it's not clear probabilities would end up with the structure of similarities (similar things close together as vectors). Although I think they would!
-->

## Embeddings

An embedding can be thought of as a descriptor, where each dimension of it is a property like electronegativity, mass. However, dimensions needn't to map to a real property.

If, for example, some dimension increases as `C<N<O<F..` (and for the next periods), a hypothesis could be that it encodes electronegativity.

Other experiments could: optimise the dimensionality of the embedding vector; plot the distribution using dimensionality reduction or PCA to further reduce it to 2-3 components.


### Ways to create embeddings
Which ways are there to create embeddings of atoms?

* Random dense vector for each atom,
* One-hot vector: one component is a 1, the rest are 0s,
    * For example: `[1,0,0]` and `[0,1,0]` are different atoms,
    * All 0s is _no atom_.
* Atom2Vec: build a matrix of co-occurences of atoms, then apply single-value decomposition (SVD).
    * Every matrix (square or not) has an SVD.
    * Comment: Does this improves over co-occurences vector?
* Mat2Vec: applies to Word2Vec algorithm to a corpus of compounds.
    * The projection matrix, initially random, ends up storing embeddings.
    * Task: context-words predict centre-word.
    * Example: "The cat ___ on the mat."
* SkipAtom: In the same paper of Word2Vec there is the Skip-gram algorithm, which is adapted for chemistry in this paper.
    * Task: centre-word predicts context-words "___ ___ sat __ ___ ____" (same sentence).



### Combining atom embeddings (pooling)
(not yet finished)

Then for a given compound, the embeddings for each of its atoms can be combined (pooled) into a single vector.

The resulting vector is a compound embedding. On the on hand, similar compounds will have similar vectors, which is useful; on the other hand, all isomers have the same vector, which is a limitation of what this method can express.

The resulting compound embedding is then used for training a feed-forward NN on different tasks. Also benchmarked using MatBench.

## When it's useful

With this model, having just the material's composition but not its structure, we can still try to calculate some properties.

The model does use connectivity information to train it (just the pairs, without any extra data like distance or angles). But the model just needs the formula at inference time (and does fine with non-stoichiometric solids).

Another reason why it matters is that, apparently, calculating a property of interest using DFT is computationally expensive, and this could be faster. They claim that DFT also has challenges with systems with strongly correlated electrons, or high levels of disorder (unsure what this means).



[Nature]: https://www.nature.com/articles/s41524-022-00729-3
