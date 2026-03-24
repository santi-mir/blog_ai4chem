# EHME: Concepts

In [this paper][EHME] the model _Explainable Hierarchical Monte Carlo Ensemble_ (EHME) is proposed.

--------------

In short, _simple models are used to fit a split dataset_.

Three stages of explainability are defined: pre-modelling, modelling and post-modelling explainability.

**Pre-modelling** explainability is about preparing the dataset to make it suitable for the training of explainable models. To this end, they **split the dataset** and fit each subset with simpler (more explainable) models. They also use [ElemNet]-like composition vectors, so that the model's input is interpretable.[^1]

The remaining stages are more complex and deserve full sections.

## Modelling Explainability

The core idea for model explainability is to use euclidean-based probabilities, which is considered explainable. The _model_ is:

$$P_i = {\large \frac{||\mathbf{v}-\mathbf{c}^i||^{-1}}{\sum_{j=1}^m ||\mathbf{v}-\mathbf{c}^j||^{-1}}}$$

Where $m$ is the number of classes and $||\cdot||$ are euclidean distances. When the vector $\mathbf{v}$ and centroid $\mathbf{c}^i$ (for class $i$) are closer, the probability $P_i$ of the test item belonging to that class increases.


### Where do models come from?

Remember that the dataset is split into clusters, and each cluster has its own centroids, hence own euclidean distance model.

In other words, a model exists for each cluster (with its own centroid); we could use $P_i^k$, indicating model $k$, but it makes it harder to read.

When the confidence test fails (see [next section][post_modelling]), a new model is run (from another cluster). This repeats until one is confident enough.

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

## Post-modelling explainability

Given a probability $P_x$ of membership to class $x$, the confidence test $P^i_{max} \gt P^j_{max_2} + \delta$ can be used to define a region of interest. But how, exactly?

Given the centroids of two classes, we can walk the line from one centroid to the other, until the probability decays a desired amount $\delta$. That is called the "up" boundary, and walking opposite direction is the "down" boundary (which decays slower).

This can also be done in different directions. Then we can consider any vector within that area as a vector of interest. This is the coolest idea in the paper, and it is quite badly explained (the figure isn't too bad though).

The point at which they become equal is called Rocchio boundary. And the surface defined at the distance we decide for (given the probability we aimed at) defines a hyper-ball / hypersphere.

[ElemNet]: https://www.nature.com/articles/s41598-018-35934-y
[EHME]: https://fruct.org/files/publications/volume-38/fruct38/Urs.pdf
[post_modelling]: #post-modelling-explainability
[^1]: Other approaches require training to produce higher-quality element vectors, such as Mat2Vec or SkipAtom. These are not intrinsically interpretable nor always produce better results.

