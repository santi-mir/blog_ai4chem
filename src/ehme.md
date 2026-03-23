# Explainable Hierarchical Monte Carlo Ensemble

In the paper [Domain Independent XAI for Material Science][EHME] the model Explainable Hierarchical Monte Carlo Ensemble (EHME) is proposed.

We can clarify some of the terms:

- **Domain Independent**: They use composition vectors; it is "domain independent" only within materials science.
- **Explainable**: Simple input (composition vector), euclidean distance classification, hyperspace definition.
- **Hierarchical**: Involves passing on what isn't classified to other classifiers up the hierarchy,
- **Monte Carlo Ensemble**: multiple Monte Carlo models.

_Explainability_ is unclear in the text. The model uses an euclidean distance formula to estimate the probability of a class. The distance is of the input vector to class vectors. (Is the input vector the composition vector directly?)

The class vectors are produced through an evolution algorithm and Monte Carlo ensembles. And this part is quite confusing.

So this post focuses on the key ideas, with "just enough" of explainability.

## Hierarchical Learning

The hierarchical learning idea is a hypothesis to deal with smaller datasets and use less complex models.
In a nutshell it assumes:

1. The dataset can be split into regions,
2. A test input can be classified for class $i$ if $P_{i=max} \gt P_{j=max_2} + \delta$ is met, or passed to the next model in the _hierarchy_,
3. The models can be ordered hierarchically.

In my view the paper's use of the term _hyperspace_ is inaccurate; hyperspace is $\mathbb{R}^{N > 3}$. What they have seem _subsets of hyperspace_ given by the probability condition above.

In simpler words, $\delta$ defines a limit for an input to belong to a class, with reasonable confidence.

## Explainability Stages

The stages are pre-modelling, modelling and post-modelling; each stage is somewhat related to making the model simple and explainable.

### Pre-modelling: composition vector

They use a composition representation, sometimes called fractional.

The _fractional_ representation is $\vec{v}_c = \frac{1}{N}\sum n_a \vec{h}_a$; an average of one-hot encoded vectors ($\vec{h}$) of atoms ($a$).

Other approaches require training to produce higher-quality element vectors, such as Mat2Vec or SkipAtom. The performance is not too different though.

### Modelling: euclidean-based probabilities

Each $P$ of membership in $P_{i=max} \gt P_{j=max_2} + \delta$ is calculated from:

$$P_i = \frac{1/||v-c^i||}{\sum_{j=1}^m 1/||v-c^j||}$$

$m$ is the number of classes; $||\cdot||$ are euclidean distances between test vectors $v$ and centroids $c$.

Closer distances have higher probabilities, and farther ones lower.

They propose two methods to generate centroids. In both cases, the centroids are trained using an evolutionary algorithm (EA).

1. Trained Detailed Centroids (TDC):
   - Class centroid independently trained,
   - Params to train: $n\times{}m$ parameters given by $n$ features and $m$ classes,
2. Trained Compressed Centroids (TCC):
   - Class centroid generated from a common centroid,
   - Params to train: $n + m$ (less parameters, compressed).

According to the paper, TDC differs from KNN, which uses _actual centroids_ rather than _trained centroids_.

In TCC, to generate the vector for class $i$, compare components of the common centroid $cc$ to the class parameter $p_i$, that is: $\mathbf{v^{(i)}} = (min (cc_j, p_i))_{j=1}^{n}$.

### Post-modelling

Seems to be just selecting $\delta$ in the probability formula given earlier.

### EHME

The centroids are trained using an evolutionary algorighm (EA).

## My questions so far

- Could KNN be used to decide Hypothesis B? Possibly.
- <q>However, they are not suitable for incorporating a Euclidean distance model.</q> Can't DL use this?

## Other avenues

One could also test the opposite Hypothesis to B, i.e that those regions actually are or can-be-made to reside quite close.

Or could also use other kinds of hierarchies: for example to train a model to predict Class A, Class B,...and Class X. Where class X would be "Other", and in that case it is passed on.

Another idea would be to have a "routing" network that delegates to each based on a higher classification (could be what they did).
(Some of these may be what they did, still unsure)

[EHME]: https://fruct.org/files/publications/volume-38/fruct38/Urs.pdf
