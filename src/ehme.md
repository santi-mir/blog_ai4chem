# EHME: Concepts

In [this paper][EHME] the model _Explainable Hierarchical Monte Carlo Ensemble_ (EHME) is proposed.

In short, _simple models are used to fit a split dataset_. Let's expand on some of the ideas behind this.

## Explainability Stages

### Pre-modelling Explainability

The paper states:

> Pre-modelling explainability refers to dataset preparation to make it suitable for training of explainable models.

The core idea is to **split the dataset** and then use simpler models.

They also use [ElemNet]'s _fractional_ representation is $\mathbf{v} = \frac{1}{N}\sum_a n_a \mathbf{h}_a$; an average of one-hot encoded vectors $\mathbf{h}$ of atoms $a$.[^1] This does not make the model later on explainable, but seems reasonable to consider it here.

### Modelling Explainability

The core idea for model explainability is to use euclidean-based probabilities, which is considered explainable.

The _model_ is: $P_i = {\Large \frac{||\mathbf{v}-\mathbf{c}^i||^{-1}}{\sum_{j=1}^m ||\mathbf{v}-\mathbf{c}^j||^{-1}}}$ where $m$ is the number of classes and $||\cdot||$ are euclidean distances between test vectors $\mathbf{v}$ and centroids $\mathbf{c}$.

The closer the vector and centroid are, the higher the probability of the test item belonging to that class.

<details>
<summary>Centroids (optional)</summary>

They propose two methods to generate centroids. In both cases, the centroids are trained using an evolutionary algorithm (EA).

1. Trained Detailed Centroids (TDC):
   - Class centroid independently trained,
   - Params to train: $n\times{}m$ parameters given by $n$ features and $m$ classes,
2. Trained Compressed Centroids (TCC):
   - Class centroid generated from a common centroid,
   - Params to train: $n + m$ (less parameters, compressed).

According to the paper, TDC differs from KNN, which uses _actual centroids_ rather than _trained centroids_.

In TCC, to generate the vector for class $i$, compare components of the common centroid $cc$ to the class parameter $p_i$, that is: $\mathbf{v}^{(i)} = (min (cc_j, p_i))_{j=1}^{n}$.

</details>

#### Where do models come from?

Remember that the dataset is split into clusters, and each cluster has its own centroids, hence own euclidean distance model.

When the confidence test fails, a new model is run (from another cluster). This repeats until one is confident enough.

### Post-modelling explainability

The hierarchy stems from the _constrain_ in the probability $P$ of membership: $P_{i=max} \gt P_{j=max_2} + \delta$. The test input is passed on to the next model if this doesn't hold.

This stage seems to be just selecting $\delta$ which helps define regions of interest. This is not the calculation of centroids (previous step), but a vector that makes the probabilities of interest equal (0.5 for two classes.)

[ElemNet]: https://www.nature.com/articles/s41598-018-35934-y
[EHME]: https://fruct.org/files/publications/volume-38/fruct38/Urs.pdf
[^1]: Other approaches require training to produce higher-quality element vectors, such as Mat2Vec or SkipAtom. The performance is not too different though.
