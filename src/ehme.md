# Explainable Hierarchical Monte Carlo Ensemble

In the paper [Domain Independent XAI for Material Science][EHME] the model Explainable Hierarchical Monte Carlo Ensemble (EHME) is proposed.

We can clarify some of the terms:

- **Domain Independent**: They use composition vectors; it is "domain independent" only within materials science.
- **Explainable**: Simple input (composition vector), euclidean distance classification, hyperspace definition.
- **Hierarchical**: Involves passing on what isn't classified to other classifiers up the hierarchy,
- **Monte Carlo**: one of the methods, it's not explained how it is used very much.
- **Ensemble**: multiple models.

_Explainable_ is not so well defined in the text. The model uses an euclidean distance formula to estimate the probability of a class. The distance is of the input vector to class vectors. But is the input vector the composition vector directly?

The class vectors are produced through an evolution algorithm and Monte Carlo ensembles. And this part is quite confusing.

So this post focuses on the key ideas, with "just enough" of explainability.

## Explainability

They analyse it in different explanability stages: pre-modelling, modelling and post-modelling.

### Pre-modelling: Dataset and Representation

They use a composition representation, sometimes called fractional.

The _fractional_ representation is $\vec{v}_c = \frac{1}{N}\sum n_a \vec{h}_a$; an average of one-hot encoded vectors ($\vec{h}$) of atoms ($a$).

Other approaches require training to produce higher-quality element vectors, such as Mat2Vec or SkipAtom. The performance is not too different though.

### Modelling

If the probability ($P$) condition $P_{max} \gt P_{max_2} + \delta$ isn't met, the test input is passed to the next model in the hierarchy. Each $P$ is calculated from:

$$P_i = \frac{1/||v-c^i||}{\sum_{j=1}^m 1/||v-c^j||}$$

$m$ is the number of classes; $||\cdot||$ are euclidean distances between test vectors $v$ and centroids $c$.

Closer distances have higher probabilities, and farther ones lower.

#### Centroids

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
