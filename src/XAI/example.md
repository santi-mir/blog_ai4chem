# Explainable Hierarchical Monte Carlo Ensemble

In the paper [Domain Independent XAI for Material Science][EHME] the model Explainable Hierarchical Monte Carlo Ensemble (EHME) is proposed.

We can clarify some of the terms:

- **Domain Independent**: The atom-vectors aren't expert-designed but one-hot encoded,
- **Explainable**: simpler models,
- **Hierarchical**: Involves passing on what isn't classified to other classifiers up the hierarchy,
- **Monte Carlo**: the method,
- **Ensemble**: multiple models.

## Classify or pass on

Three hypothesis structure the paper:

- Hypothesis A (split dataset): views the dataset as union of independent regions. For a region, the models required are simpler and more explainable.
- Hypothesis B (pass on): For a test item, its region _and_ class are unknown, so which model should be executed?
    - Litmus test: If $P_{max} \gt P_{max_2} + \delta$ then it is classified; else, pass the item to the next model up the hierarchy.
    - This is run until the item is classified.
- Hypothesis C (hierarchy): models representing regions of a dataset can be hierarchically ordered.[^1]

They argue that this allows simpler models, requiring less data and being more interpretable.

## Explainability

They analyse it in different explanability stages: pre-modelling (i.e dataset and representation), modelling and post-modelling.

### Pre-modelling: Dataset and Representation

The pre-modelling section in the [paper][ehmc] states:

> Pre-modelling explainability refers to dataset preparation to make it suitable for training of explainable models.

This is a strange definition, but pragmatically, what they do is using an obvious (explainable) and general (domain independent) representation.

The _fractional_ representation is $\vec{v}_c = \frac{1}{N}\sum n_a \vec{h}_a$; an average of one-hot encoded vectors ($\vec{h}$) of atoms ($a$).

Other approaches require training to produce higher-quality element vectors, such as Mat2Vec or SkipAtom. The performance is not too different though.

### Modelling

The classification condition is $P_max \gt P_{max_2} + \delta$, where each $P_i$ comes from:

$$P_i = \frac{1/d_i}{\sum_0^m 1/d_j}$$

$m$ is the number of classes, $d_i$ the euclidean distance to each classes' _trained centroid_. That is, a trained vector that represents the class.

- The smaller $d_i$ is (closer to centroid $i$) the larger $P_i$ is, since the term $1/d_i$ eventually dominates the sum.
- The larger $d_i$ is (far from centroid) the more it tends towards zero, the term contributes little to the sum.

They propose two methods to generate centroids:

1. Trained Detailed Centroids (TDC):
   - Each class has an independently trained centroid,
   - Params to train: $n\times{}m$ parameters given by $n$ features and $m$ classes,
   - According to the paper, TDC differs from KNN, which uses _actual centroids_ rather than _trained centroids_.
2. Trained Compressed Centroids (TCC):
   - Classes centroids are generated from a common centroid,
   - Params to train: $n + m$, for $m$ classes and $n$ features of $c$,
   - Aims to reduce N params which may be too large for a small dataset to optimise.

The class compressed centroid comes from comparing the compressed centroid ($P$) with the single class parameter ($Q_i$), using "minimum" function:

$$\vec{c}_i = \langle \text{min}(P_1, Q_i), \ldots, \text{min}(P_n, Q_i)\rangle$$

which is done for each class. It could be represented as a matrix but I find it less clear. Or in a single formula: ${\large\forall{}}_{j=1,n}^{i=1,m}\text{min}(P_j, Q_i)$.

## My questions so far

- Could KNN be used to decide Hypothesis B? Possibly.
- <q>However, they are not suitable for incorporating a Euclidean distance model.</q> Can't DL use this?
- How are the detailed trained centroids, and common centroids calculated?

## Other avenues

One could also test the opposite Hypothesis to B, i.e that those regions actually are or can-be-made to reside quite close.

Or could also use other kinds of hierarchies: for example to train a model to predict Class A, Class B,...and Class X. Where class X would be "Other", and in that case it is passed on.

Another idea would be to have a "routing" network that delegates to each based on a higher classification (could be what they did).
(Some of these may be what they did, still unsure)

[EHME]: https://fruct.org/files/publications/volume-38/fruct38/Urs.pdf
[^1]: So far, it looks more like it involves passing whatever a model can't classify with enough confidence to the next model, and the next, and so on. But hierarchy may be obvious in next sections.
