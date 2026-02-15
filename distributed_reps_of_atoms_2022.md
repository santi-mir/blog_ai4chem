# Learning embeddings for atoms

I've recently read the paper ["Distributed representations of atoms and materials for
machine learning"][Nature] (2022).

I write some thoughts about it below.


## Embeddings

Which ways are there to create embeddings of atoms?

* Random vector for each atom,
* One-hot vector: One component is a 1, the rest are 0s,
    * For example: `[1,0,0]` and `[0,1,0]` are different atoms,
    * Each index represents an atom,
    * Only one position is a 1 (and all 0s would be no atom).
* Atom2Vec: build a matrix of co-occurences of atoms, then apply single-value decomposition (SVD).
    * Every matrix (square or not) has an SVD.
    * Comment: not quite sure why this would be attractive or useful, but they used it.
* Mat2Vec: Applies to Word2Vec algorithm to a corpus of compounds.
    * The task is given context word predict the blank, as in "The cat ___ on the mat."
* SkipAtom: In the same paper of Word2Vec there is the Skip-gram algorithm, which is adapted for chemistry in this paper.
    * The task here is to use the word to predict the neighbours "___ ___ sat __ ___ ____" (same sentence).

In both Mat2Vec and SkipAtom the analogy is that a _word_ (not a letter) is an _atom_. Multiple words make a sentence, and multiple atoms a material or compound.

## Main Idea


> We introduce an approach for learning atomic representations using an unsupervised approach. This approach, which we name SkipAtom, (...)

The idea is that training one atom to predict its neighbours will force the optimisation
process to create atom embeddings that store useful information about their environment.

<!--They say it's unsupervised, which I don't quite get yet, since the pairs seem to me Atom (input) - Neighbour (label). Still figuring it out.

An embedding is not a distributed representation.

"distributed representation" isn't just for DNNs, the embedding is distributing it into a vector.-->

The process they followed is something like:

1. Convert a database of crystal structures of materials into a graph,
2. Use the graph to generate a database of connected atom pairs A-B (and B-A),
    * Each pairs is composed of the input and the output, used for training,
3. Hot encode each atom in a vector,
4. Train a single layer to predict one vector given another,
5. They name this method SkipAtom because it adapts for chemistry SkipGram's ideas for text.

In the end, each vector is a reflection of the atom's environment, and atoms that are found in
similar environments should have similar vectors (possibly carbon and oxygen, or nitrogen).

An embedding can be thought of as a descriptor, where each dimension of it is a property like electronegativity, mass. Though most likely they only capture more concrete related to the dataset.

We can try to interpret some of it; if for example some dimension increases as C-N-O-F (and the same for atoms in the next period), then a hypothesis could be it encodes a proxy of electronegativity.

Some interesting experiments would be how to choose the optimal dimensionality of the embedding vector, plot the distribution, maybe using dimensionality reduction or PCA first to get just vectors with 2 or 3 components.

## Application
Then for a given compound, the embeddings for each of its atoms can be combined (pooled) into a single vector.

The resulting vector is a compound embedding (similar compounds will have similar vectors, and isomers would have the same vector).

This material embedding is then used for training a feed-forward NN on different tasks. Also benchmarked using MatBench.

## When it's useful

With this model, having just the material's composition but not its structure, we can still try to calculate some properties.

The model does use connectivity information to train it (just the pairs, without any extra data like distance or angles). But the model just needs the formula at inference time (and does fine with non-stoichiometric solids).

Another reason why it matters is that, apparently, calculating a property of interest using DFT is computationally expensive, and this could be faster. They claim that DFT also has challenges with systems with strongly correlated electrons, or high levels of disorder (unsure what this means).




[Nature]: https://www.nature.com/articles/s41524-022-00729-3
