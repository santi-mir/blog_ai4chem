# Explainable Hierarchical Monte Carlo Ensemble

In the paper [Domain Independent XAI for Material Science][EHME] the model Explainable Hierarchical Monte Carlo Ensemble (EHME) is proposed.

Let's expand some of the terms:

- **Domain Independent**: They use composition vectors which are domain independent _within_ materials science.
- **Explainable**: Composition vectors are intuitive, and so is euclidean distance which is the base of their classification models.
- **Hierarchical**: Involves passing on what isn't classified to other classifiers up the hierarchy.
- **Monte Carlo Ensemble**: Multiple Monte Carlo models. It's unclear how is this used, but it is coupled with the euclidean distance model.

## Hierarchical Learning

The hierarchical learning[^1] idea is a hypothesis to deal with smaller datasets and use less complex models. In a nutshell, it assumes:

1. The dataset can be split into regions,
2. The hierarchy arises from the constrain $P_{i=max} \gt P_{j=max_2} + \delta$ which test input passes to the next predictor if unmet,
3. The models can be ordered hierarchically.

So $\delta$ defines a limit for an input to belong to a class, with reasonable confidence.

### What is this doing exactly?

Remember that the dataset is split into regions, and each region has its own centroids (hence own model).

When the probability-test fails, the item is passed on to a classifier from another region.
This repeats until one is confident enough.

## Explainability Stages

The stages are pre-modelling, modelling and post-modelling; each stage is somewhat related to making the model simple and explainable.

### Pre-modelling: composition vector

They use [ElemNet]'s _fractional_ representation is $\mathbf{v} = \frac{1}{N}\sum_a n_a \mathbf{h}_a$; an average of one-hot encoded vectors $\mathbf{h}$ of atoms $a$.[^2]

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

## My questions so far

- Could KNN be used to decide Hypothesis B? Possibly.
- <q>However, they are not suitable for incorporating a Euclidean distance model.</q> Can't DL use this?
- How are the datasets split, and which role does Monte Carlo Ensemble play?

## Other avenues

One could also test the opposite Hypothesis to B, i.e that those regions actually are or can-be-made to reside quite close.

Or could also use other kinds of hierarchies: for example to train a model to predict Class A, Class B,...and Class X. Where class X would be "Other", and in that case it is passed on.

Another idea would be to have a "routing" network that delegates to each based on a higher classification (could be what they did).
(Some of these may be what they did, still unsure)

[ElemNet]: https://www.nature.com/articles/s41598-018-35934-y
[EHME]: https://fruct.org/files/publications/volume-38/fruct38/Urs.pdf
[^1]: In my view the paper's use of the term _hyperspace_ is inaccurate; hyperspace is $\mathbb{R}^{N > 3}$. What they have seem _subsets of hyperspace_ given by the probability condition above.
[^2]: Other approaches require training to produce higher-quality element vectors, such as Mat2Vec or SkipAtom. The performance is not too different though.
