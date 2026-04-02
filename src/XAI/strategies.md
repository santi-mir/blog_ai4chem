# XAI - Linear Methods

Linear methods, including Shapley Values and LIME, result from linear approximations ($g$) to the original ($f$). Mathematically:

$$f(x) \approx g(z') = \phi_0 + \sum_{i=1} \phi_i z_i$$

$\phi_i$ is the effect of each _binary_ feature $z_i$ in the output.

>[!important]
> The methods differ in how they estimate the coefficients $\phi_i$ &mdash;and their resulting coefficients are normally differ.

It should be noted that:

1. $\phi_i$s are contributions of the linear approximation $g$,
2. Two complex models $f_1, f_2$ trained with same data likely have different $\phi_i$s,
3. Methods don't protect from a biased model.

## Best coefficients

So which model gets the _best_ coefficients $\phi_i$? We need to define _best_.

> [!important]
> It can be shown Shapley values are unique/best solution for the coefficients of the linear combination requiring [3 desirable properties][unified_framework_lcobf] (local accuracy, missingness, consistency). Other methods violate some of the 3 properties.

Bear in mind, this is _their definition_ of best.

Technicalities aside, the authors argue these coefficients are more intuitive for humans.

## Important Concepts

**Multicollinearity**: one feature is a linear combination of one or more other features. For example, $x_3 = \beta_2 x_2 + \beta_1 x_1 + \beta_0$; assuming linear independence would be an error. In the [paper's words][using_shap_lime]:

> Indeed, some features might be assigned a low score despite being significantly associated with the outcome. This is because they do not improve the model performance due to their collinearity with other features whose impact has already been accounted for.

**Non-linearity**: output changes are not proportional to input changes. For example $y = \beta x^N$ is non-linear, and fitting a line $y' = \alpha x$ to it would be inaccurate. Some SHAP models can model this correctly.

In summary,

- Feature contributions to a prediction are modelled as linear sum,
- Helps build an intuition of how features affect the original model's behaviour,
- Looks at the model as a black-box.

Let's now look at popular methods of this kind, SHAP and LIME.

## Shapley Additive Explanations (SHAP)

The Shapley values $\phi_i$ result from an expensive combinatorial ([A value for n-person games][shap original], 1952). Approximations to the exact formula can be made, with extra assumptions, which **may not hold!!**:

- Assumption 1: Feature independence (implies non-multicollinearity).
    - Shapley sampling values method,
    - _Quantitative Input Influence_,
    - Plus assumption 2, model linearity: Kernel SHAP (LIME + Shapley values)
- Assumption 2, model linearity: Shapley regression values.

SHAP provides both global (average across inputs) and local (for a given input).

## LIME

Local Interpretable Model Agnostic Explanation (LIME) and Generalised Linear Models (GLMs).

For LIME, the coefficients $\phi_i$ are found minimising an objective function. The coefficients resulting from the optimisation do not necessarily obey the 3 desired properties listed earlier.

Assuming feature independence and model linearity, the objective function can be modified and the SHAP values obtained through weighted linear regression (no slow combinatorics). This is called **Kernel SHAP**, and obeys the 3 properties listed earlier.


## Fixes

- Normalised Moving Rate (NMR): tests the stability of the list against the collinearity. Smaller NMR means more stable ordering.
- Modified Index Position, in the [paper's words][using_shap_lime]:
    > [MIP] works similarly to NMR by iteratively removing the top feature and retraining and testing the model. Thereafter, it examines how the features are reordered in the model which implies the effect of collinearity.

These two methods (MIP, NMR) can be useful both in having a reliable sorting of features, and on selecting one &mdash;most stable&mdash; of several methods.

[using_shap_lime]: https://onlinelibrary.wiley.com/doi/abs/10.1002/aisy.202400304
[unified_framework_lcobf]: https://proceedings.neurips.cc/paper/2017/hash/8a20a8621978632d76c43dfd28b67767-Abstract.html
[lcobf]: #linear-combination-of-binary-features

[^1]: _Local_ in the name refers to being for a _particular input_, not _Global_ which would be general.


[shap original]: https://sites.math.rutgers.edu/~zeilberg/EM22/Shapley1952.pdf

