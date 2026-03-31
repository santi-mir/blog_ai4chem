# Explainable AI - Strategies

This post is about explainability for deep learning, focusing on some popular methods and their limitations.

## Extrinsic or Processing Methods

Many extrinsic methods estimate a contribution of each input feature to an output. They all look at the model as black-box.

### Additive Feature Attribution Methods

This is a common class of extrinsic methods. It is a class in that all methods follow this formula:

$$f(x) \approx g(z') = \sum_i \phi_i z_i$$

where $g$ is a model fitting $f$, a linear model, and $z'$ is a simplified input (it does not matter here). $\phi_i$ are the contributions, estimated differently in each method. Each method can make different assumptions and guarantees.

They all share pitfalls:

- **Pitfall 1**: The weights are _not_ a derivative with respect to the model's inputs, but it _is_ a measure of the effect in the output (Paper, [Section 2.1][using_shap_lime]),
- **Pitfall 2**: Methods are model dependent; two models trained with same data may have different ranking,
- **Pitfall 3**: Methods don't protect from a biased model.

Most methods do not capture multicollinearity between features, nor non-linear effects of the features in the output.

**Collinearity**: one feature is a linear combination of one or more other features. For example, $x_3 = \beta_2 x_2 + \beta_1 x_1 + \beta_0$; assuming linear independence would be an error.

In the [paper's words][using_shap_lime]:

> Indeed, some features might be assigned a low score despite being significantly associated with the outcome. This is because they do not improve the model performance due to their collinearity with other features whose impact has already been accounted for.

**Non-linearity**: output changes are not proportional to input changes. For example $y = \beta x^N$ is non-linear, and fitting a line $y' = \alpha x$ to it would be inaccurate. Some SHAP models can model this correctly.

Luckily, we can get some help:

- Normalised Moving Rate (NMR): tests the stability of the list against the collinearity. Smaller NMR means more stable ordering.
- Modified Index Position, in the [paper's words][using_shap_lime]:
    > [MIP] works similarly to NMR by iteratively removing the top feature and retraining and testing the model. Thereafter, it examines how the features are reordered in the model which implies the effect of collinearity.

These two methods (MIP, NMR) can be useful both in having a reliable sorting of features, and on selecting one &mdash;most stable&mdash; of several methods.

Other methods are listed in the [SHAP values] paper, building off the original Lloyd Shapley's _A value for n-person games_ paper (1953). Here SHAP and LIME are described, which are the most used ones.

#### Shapley Additive Explanations (SHAP)

The method calculates SHAP _values_, which measure the contribution or effect of each feature to the model's output.

SHAP provides both global (average across inputs) and local (for a given input).

#### Linear Proxy models

Approximate the original model with a simpler, linear one. For example, Local Interpretable Model Agnostic Explanation (LIME) and Generalised Linear Models (GLMs). How is the fit _local_?

1. Given an input $\mathbf{x}$, element-wise binary masks $\mathbf{m}_i$ are applied to it, switching components on and off.
2. We run the model with original and masked $y=f(\mathbf{x})$.
3. We now have a table of $y$ values, masks $\mathbf{m}$ and linearly fit a surrogate model to those $y$ values.

### Other Methods

- Salience Maps: aim to explain which portions of the computation (original model) are most important for different inputs.
- Validity Interval Analysis: another technique fitting the NN behaviour to try to extract explanations.
- Principal Component Analysis, Independent Component Analysis, Non-negative Matrix Factorisation can all help as well. But in a way this is better done by architectures with disentangled representations.

## Explanation-Producing systems

Architectures designed to make explaining part of their operation easier.

- Using Explicit Attention: An attention layer/mask learns how parts of an input embedding pay attention to other parts. The layer is somewhat interpretable. In chemistry, it could learn which atoms connect (or pay attention to) other atoms.

- Dissentangled Representations: "Disentangled representations have individual dimensions that describe meaningful and independent factors of variation." from [Explaining Explainability][XX], 2018. Examples of architectures are $\beta$-VAE, INFOGan, capsule networks.

## Intrinsic or Representation Methods

<details><summary>Intrinsic Methods</summary>

Interpreting the model from the inside (intrinsic), with questions such as _what information does the network contain?_.

[Explaining explainability][XX] classifies these at the level of Layer, Neuron, and Vector.

**Role of Layers**: for example, transfer learning, reusing output of some layers for another task.

**Role of Units**: <q>The role of such individual units can be understood qualitatively, by creating visualizations of the input patterns that maximize the response of a single unit, or quantitatively, by testing the ability of a unit to solve a transfer problem.</q> from [Explaining Explainability][XX], 2018.

**Role of Vectors**: for example using Concept Activation Vectors framework.

Another way is to introduce biases like symmetry considerations which can help interpretability.

</details>

This is all regarding explainability for the moment!

[XX]: http://arxiv.org/abs/1806.00069
[using_shap_lime]: https://onlinelibrary.wiley.com/doi/abs/10.1002/aisy.202400304
[SHAP values]: https://proceedings.neurips.cc/paper/2017/hash/8a20a8621978632d76c43dfd28b67767-Abstract.html

<!-- [^1]: Although some strategies do take non-linearity into account. -->
