# Learning embeddings for atoms

These are some of my opinions and ideas after reading [Distributed representations of atoms and materials for
machine learning][Nature] (2022).


## Summary

They propose an approach to learn atom embeddings ithey propose to learn atom embeddings is called SkipAtom, in reference to Word2Vec's Skip-gram algorithm.

In a nutshell, the paper proposes:

* Training one atom to predict its most common neighbours will create atom embeddings that store useful information about their environment.
* Combining these, material embeddings can be created, which are useful for NNs.
* For any new material for which we want the properties, the embedding can be generated without any structural information, which makes it useful for those cases.

They also compare it against approaches that use structural information in the inference process.


## High-Level procedure

The process they followed is something like:

1. Get a database of crystal structures of materials,
2. Convert each into a graph (paper uses Voronoi decomposition / method for this),
3. Use the graph to generate a database of connected atom pairs A-B (and B-A),
    * Each pairs is composed of the input and the output, used for training,
4. Hot encode each atom in a vector,
5. Train a single layer to predict the neighbour hot-encoded vector given the central atom,
    * The training task is to minimise the average log probability (not sure how the vectors are "reduced", is the distance computed, or what?).

The result is that each projection-matrix-column is now an atom's embedding. The atom's vector (embedding) is a reflection of the atom's environment. Atoms often found in similar environments should have similar vectors (possibly carbon, oxygen, nitrogen).

## Embeddings

An embedding can be thought of as a descriptor, where each dimension of it is a property like electronegativity, mass. Though most likely they only capture more concrete related to the dataset.

We can try to interpret some of it; if for example some dimension increases as C-N-O-F (and the same for atoms in the next period), then a hypothesis could be it encodes a proxy of electronegativity.

Some interesting experiments would be how to choose the optimal dimensionality of the embedding vector, plot the distribution, maybe using dimensionality reduction or PCA first to get just vectors with 2 or 3 components.


### Ways to create embeddings
Which ways are there to create embeddings of atoms?

* Random vector for each atom,
* One-hot vector: one component is a 1, the rest are 0s,
    * For example: `[1,0,0]` and `[0,1,0]` are different atoms,
    * Each index represents an atom,
    * Only one position is a 1 (and all 0s would be no atom).
* Atom2Vec: build a matrix of co-occurences of atoms, then apply single-value decomposition (SVD).
    * Every matrix (square or not) has an SVD.
    * Comment: not quite sure why this would be attractive or useful, but they used it.
* Mat2Vec: applies to Word2Vec algorithm to a corpus of compounds.
    * The projection matrix, initially random, ends up storing embeddings.
    * The task is to predict the missing word given neighbouring words.
    * Example: as in "The cat ___ on the mat."
* SkipAtom: In the same paper of Word2Vec there is the Skip-gram algorithm, which is adapted for chemistry in this paper.
    * The task here is to use the word to predict the neighbours "___ ___ sat __ ___ ____" (same sentence).

In both Mat2Vec and SkipAtom the analogy is that a _word_ (not a letter) is an _atom_. Multiple words make a sentence, and multiple atoms a material or compound.


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
