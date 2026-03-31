# Explainable AI - Strategies

We want to explain the operation or "behaviour" of a model, such as a deep learning model.

There are many classifications; instead, the post focuses on particular methods.

## Linear Combination of Binary Features

- Models the contribution of each feature to an output or prediction as a linear sum,
- Helps build an intuition of how features affect its behaviour,
- Looks at the model as a black-box.

This models form a _class_ in that all methods follow this formula:

$$f(x) \approx g(z') = \phi_0 + \sum_{i=1} \phi_i z_i$$

$g$ is a linear model fitting $f$, the complex model. $\phi_i$ is the effect of each binary feature $z_i$ in the output.

Different methods in the class make different assumptions, and result in different contributions.

This class of methods all share pitfalls:

- **Pitfall 1**: The weights are _not_ a derivative with respect to the model's inputs, but it _is_ a measure of the effect in the output (Paper, [Section 2.1][using_shap_lime]),
- **Pitfall 2**: Methods are model dependent; two models trained with same data may have different ranking,
- **Pitfall 3**: Methods don't protect from a biased model.

Besides, most do not capture _multicollinearity_ between features, nor _non-linear effects_ of the features to the output.

**Collinearity**: one feature is a linear combination of one or more other features. For example, $x_3 = \beta_2 x_2 + \beta_1 x_1 + \beta_0$; assuming linear independence would be an error.

In the [paper's words][using_shap_lime]:

> Indeed, some features might be assigned a low score despite being significantly associated with the outcome. This is because they do not improve the model performance due to their collinearity with other features whose impact has already been accounted for.

**Non-linearity**: output changes are not proportional to input changes. For example $y = \beta x^N$ is non-linear, and fitting a line $y' = \alpha x$ to it would be inaccurate. Some SHAP models can model this correctly.

Luckily, we can get some help:

- Normalised Moving Rate (NMR): tests the stability of the list against the collinearity. Smaller NMR means more stable ordering.
- Modified Index Position, in the [paper's words][using_shap_lime]:
    > [MIP] works similarly to NMR by iteratively removing the top feature and retraining and testing the model. Thereafter, it examines how the features are reordered in the model which implies the effect of collinearity.

These two methods (MIP, NMR) can be useful both in having a reliable sorting of features, and on selecting one &mdash;most stable&mdash; of several methods.

Other methods are listed in the [Unified Framework][unified_framework_lcof] paper, building off the original Lloyd Shapley's _A value for n-person games_ paper (1953). Here SHAP and LIME are described, which are the most used ones.

### Shapley Additive Explanations (SHAP)

SHAP values are estimations of the contribution of each feature to the model's output.

SHAP provides both global (average across inputs) and local (for a given input).

### Linear Proxy models

Approximate the original model with a simpler, linear one. For example, Local Interpretable Model Agnostic Explanation (LIME) and Generalised Linear Models (GLMs).

1. Given an input $\mathbf{x}$, element-wise binary masks $\mathbf{m}_i$ are applied to it, switching components on and off.
2. We run the model with original and masked $y=f(\mathbf{x})$.
3. We now have a table of $y$ values, masks $\mathbf{m}$ and linearly fit a surrogate model to those $y$ values.
4. The coefficients $\phi_i$ are found minimising an objective function. This is similar to MSE objective function, minimised in standard linear regression in order to find the coefficients.

"Local" in the name refers to being for a _particular input_, not "Global" which would be general.

## Other Methods

- Salience Maps: aim to explain which portions of the computation (original model) are most important for different inputs.
- Validity Interval Analysis: another technique fitting the NN behaviour to try to extract explanations.
- Principal Component Analysis, t-SNE, Dimensionality Reduction, Independent Component Analysis, Non-negative Matrix Factorisation can all help as well. But in a way this is better done by architectures with disentangled representations.

## Architectures

Architectures designed to make explaining part of their operation easier.

- Using Explicit Attention: An attention layer/mask learns how parts of an input embedding pay attention to other parts. The layer is somewhat interpretable. In chemistry, it could learn which atoms connect (or pay attention to) other atoms.

- Dissentangled Representations: "Disentangled representations have individual dimensions that describe meaningful and independent factors of variation." from [Explaining Explainability][XX], 2018. Examples of architectures are $\beta$-VAE, INFOGan, capsule networks.

[XX]: http://arxiv.org/abs/1806.00069
[using_shap_lime]: https://onlinelibrary.wiley.com/doi/abs/10.1002/aisy.202400304
[unified_framework_lcof]: https://proceedings.neurips.cc/paper/2017/hash/8a20a8621978632d76c43dfd28b67767-Abstract.html
