# Machine learning for molecular and  materials science

Useful snippets from the Perspective paper [Machine learning for molecular and materials science][Nature].

## Representations of atoms, molecules, materials

The process of converting raw data into a format more suitable for an algorithm is called _feature engineering_.

> The more suitable the representation of the input data, the more accurately can an algorithm map it to the output data.
>
> Selecting how best to represent the data may require insight into both the underlying scientific problem and the operation of the learning algorithm, since it is not always obvious which choice of representation will give the best performance

> Many representations are available to encode structures and properties

* Coulomb Matrix: atomic nuclear repulsion information.
* Graphs: connectivity of molecules.
* Solid-state unit-cells: Representations based on radial distribution functions, Voronoi tessellations, and property-labelled materials fragments (...)
    > In the solid-state, the conventional description of crystal structures by translation vectors and fractional coordinates of the atoms is **not appropriate for ML**, since a lattice can be represented in an infinite number of ways by choosing a different coordinate system.

## Areas
They see possible impact in a few areas:

* Synthesis: retrosynthesis, crystallisation predictions, etc.
* Characterisation: for example analysing images (CV)
* Modelling: reducing time and improving accuracy of calculations
* Drug discovery, Drug design, Inverse Design, Property Prediction,..

## Algorithms

* Naive Bayes:
    > Bayes’ theorem provides a formal way to calculate the probability that a hypothesis is correct, given a set of existing data.
* Nearest Neighbour:
    > In nearest neighbour (k-NN) methods the distances between samples and training data in a descriptor hyperspace are calculated. k-NN methods are so-called because the output value for a prediction relies on the values of the k nearest neighbours, where k is an integer.
* Decision Trees:
    > are flowchart-like diagrams used to determine a course of action or outcomes. (...) with branches indicating that each option is mutually exclusive. (...) Both root and leaf nodes contain questions or criteria to be answered.
* > Kernel methods are a class of algorithms; whose best known members are the support vector machine (SVM) and kernel ridge regression (KRR).
* > Artificial neural networks (ANNs) and deep neural networks (DNNs). (...) Learning is the process of adjusting the weights so that the training data are reproduced as accurately as possible. (...) The values of internal variables (hyperparameters) are estimated beforehand using systematic and random searches, or heuristics.

[Nature]: https://www.nature.com/articles/s41586-018-0337-2
