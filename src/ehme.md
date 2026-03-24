# EHME

In [this paper][EHME] the model _Explainable Hierarchical Monte Carlo Ensemble_ (EHME) is proposed.

Problem: How to have simple (explainable) models represent complex datasets _and_ be accurate?

Solution: They suggest to split datasets into clusters and have a simpler model for each cluster. Furthermore, models are hierarchically organised.

And what is a _simple_ (explainable) model? Here, it is a euclidean-distance based model, which is considered explainable.

In short, we have a set of euclidean-distance based models each responsible for different clusters of a split dataset.

## Explainable Hierarchical Learning

The ideas below help define an _explainable model_ that will use _hierarchical learning_.

1. A complex dataset can be split into clusters, each one following a simpler pattern, each captured by a simpler model,
2. To handle model participation they use a confidence test: rank classes using $P$ then calculate $P^i_{max} \gt P^j_{max_2} + \delta$
   - Input is from $i$ if met, else it is passed to the next predictor.
3. Models from each cluster can be ordered hierarchically. So the $P$s always start from a first model and follow an order.

Which aims to connect hierarchical learning to explainability. How? Because each _model_ in the hierarchy is explainable.

### But where do these models come from?

Remember that the dataset is split into clusters, and each cluster has its own centroids, hence own euclidean distance model.

When the confidence test fails, a new model is run (from another cluster). This repeats until one is confident enough.

## Explainability Stages

The stages are pre-modelling, modelling and post-modelling; each stage is somewhat related to making the model simple and explainable.

### Pre-modelling: composition vector

They use [ElemNet]'s _fractional_ representation is $\mathbf{v} = \frac{1}{N}\sum_a n_a \mathbf{h}_a$; an average of one-hot encoded vectors $\mathbf{h}$ of atoms $a$.[^1]

### Modelling: euclidean-based probabilities

The hierarchy stems from the _constrain_ in the probability $P$ of membership: $P_{i=max} \gt P_{j=max_2} + \delta$. The test input is passed on to the next model if this doesn't hold.

The _model_ is: $P_i = {\Large \frac{||\mathbf{v}-\mathbf{c}^i||^{-1}}{\sum_{j=1}^m ||\mathbf{v}-\mathbf{c}^j||^{-1}}}$ where $m$ is the number of classes and $||\cdot||$ are euclidean distances between test vectors $\mathbf{v}$ and centroids $\mathbf{c}$.

The closer the vector and centroid are, the higher the probability of the test item belonging to that class.

They propose two methods to generate centroids. In both cases, the centroids are trained using an evolutionary algorithm (EA).

1. Trained Detailed Centroids (TDC):
   - Class centroid independently trained,
   - Params to train: $n\times{}m$ parameters given by $n$ features and $m$ classes,
2. Trained Compressed Centroids (TCC):
   - Class centroid generated from a common centroid,
   - Params to train: $n + m$ (less parameters, compressed).

According to the paper, TDC differs from KNN, which uses _actual centroids_ rather than _trained centroids_.

In TCC, to generate the vector for class $i$, compare components of the common centroid $cc$ to the class parameter $p_i$, that is: $\mathbf{v}^{(i)} = (min (cc_j, p_i))_{j=1}^{n}$.

### Post-modelling

Seems to be just selecting $\delta$ which helps define regions of interest. This is not the calculation of centroids (previous step), but a vector that makes the probabilities of interest equal (0.5 for two classes.)

[ElemNet]: https://www.nature.com/articles/s41598-018-35934-y
[EHME]: https://fruct.org/files/publications/volume-38/fruct38/Urs.pdf
[^1]: Other approaches require training to produce higher-quality element vectors, such as Mat2Vec or SkipAtom. The performance is not too different though.
