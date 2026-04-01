# Explainable AI - Methods

There are many classifications that could be laid out; instead, the post focuses on particular methods.

## Linear Combination of Binary Features

These models form a _class_ in that all methods follow this formula:

$$f(x) \approx g(z') = \phi_0 + \sum_{i=1} \phi_i z_i$$

$g$ is a linear model fitting $f$, the complex model. $\phi_i$ is the effect of each binary feature $z_i$ in the output.

Different methods in the class make different assumptions, and result in different contributions ($\phi_i$).

### Pitfalls

This class of methods all share pitfalls:

- **Pitfall 1**: The weights are _not_ a derivative with respect to the model's inputs, but it _is_ a measure of the effect in the output,
- **Pitfall 2**: Methods are model dependent; two models trained with same data may have different ranking,
- **Pitfall 3**: Methods don't protect from a biased model.

### Limitations

_Some_ models in the class do not capture _multicollinearity_ between features, nor _non-linear effects_ of the features to the output.

**Collinearity**: one feature is a linear combination of one or more other features. For example, $x_3 = \beta_2 x_2 + \beta_1 x_1 + \beta_0$; assuming linear independence would be an error.

In the [paper's words][using_shap_lime]:

> Indeed, some features might be assigned a low score despite being significantly associated with the outcome. This is because they do not improve the model performance due to their collinearity with other features whose impact has already been accounted for.

**Non-linearity**: output changes are not proportional to input changes. For example $y = \beta x^N$ is non-linear, and fitting a line $y' = \alpha x$ to it would be inaccurate. Some SHAP models can model this correctly.

Luckily, we can get some help:

- Normalised Moving Rate (NMR): tests the stability of the list against the collinearity. Smaller NMR means more stable ordering.
- Modified Index Position, in the [paper's words][using_shap_lime]:
    > [MIP] works similarly to NMR by iteratively removing the top feature and retraining and testing the model. Thereafter, it examines how the features are reordered in the model which implies the effect of collinearity.

These two methods (MIP, NMR) can be useful both in having a reliable sorting of features, and on selecting one &mdash;most stable&mdash; of several methods.

In summary,

- Feature contributions to a prediction are modelled as linear sum,
- Helps build an intuition of how features affect the original model's behaviour,
- Looks at the model as a black-box.

Let's now look at popular linear methods of this kind.

### Shapley Additive Explanations (SHAP)

Different models in the class calculate $\phi_i$s differently.
The [SHAP method][shap original] (1953) calls the coefficients SHAP values.

But anyway, which model in the class is _best_? We need a definition of _best_.

The paper proposing the [Unified Framework][unified_framework_lcobf] (the linear combination at the top) suggests 3 desirable properties for any methods. Young (1985) proved that SHAP has the 3 properties(is best); other methods violate some of the 3 properties. But again, according to _their definition_ of best.

SHAP provides both global (average across inputs) and local (for a given input).

### LIME

Local Interpretable Model Agnostic Explanation (LIME) and Generalised Linear Models (GLMs) are both methods in the class, and exactly obey the [formula at the top][lcobf].[^1]

All methods in the class simply differ in _how_ the $\phi_i$ are calculated, and the assumptions they make.

For LIME, the coefficients $\phi_i$ are found minimising an objective function. The process is similar to MSE objective function, minimised in standard linear regression in order to find the coefficients.

[shap original]: https://sites.math.rutgers.edu/~zeilberg/EM22/Shapley1952.pdf
[using_shap_lime]: https://onlinelibrary.wiley.com/doi/abs/10.1002/aisy.202400304
[unified_framework_lcobf]: https://proceedings.neurips.cc/paper/2017/hash/8a20a8621978632d76c43dfd28b67767-Abstract.html
[lcobf]: #linear-combination-of-binary-features

[^1]: _Local_ in the name refers to being for a _particular input_, not _Global_ which would be general.
