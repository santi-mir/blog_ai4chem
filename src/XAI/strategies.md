# Explainable AI - Strategies

It is essential to understand the details of XAI models, or we would be placing black boxes on top of black boxes.

Explainability isn't only for deep learning, but this will be the focus of this post. Particularly, in _kinds_ of techniques, focusing on some popular ones and their limitations or pitfalls.

## Intrinsic or Representation Methods

Interpreting the model from the inside (intrinsic), with questions such as _what information does the network contain?_.

[Explaining explainability][XX] classifies these at the level of Layer, Neuron, and Vector.

- **Role of Layers**: for example, transfer learning, reusing output of some layers for another task.
- **Role of Units**: <q>The role of such individual units can be understood qualitatively, by creating visualizations of the input patterns that maximize the response of a single unit, or quantitatively, by testing the ability of a unit to solve a transfer problem.</q> from [Explaining Explainability][XX], 2018.
- **Role of Vectors**: for example using Concept Activation Vectors framework.

Another way is to introduce biases like symmetry considerations which can help interpretability.

## Extrinsic or Processing Methods

Many extrinsic methods measure importance of input features determining the output. Two examples are SHAP and LIME.

### Shapley Additive Explanations (SHAP)

Calculates a score (SHAP values) for each feature in the model, representing the contribution of that feature to the model's output.

- **Pitfall 1**: The feature-contribution is not a weight or derivative with respect to the inputs. The main focus should be on the order of values (Paper, [Section 2.1][SHAP AND LIME]),
- **Pitfall 2**: It is model dependent: two models trained with same data may have different ranking,
- **Pitfall 3**: does not protect from a biased model,
- It applies to the model as-is,
- It offers both global (average across inputs) and local (an given input), but still looks at the model as black box.

### Limitations

In the most basic form, both SHAP and LIME methods do not capture multicollinearity between features, and non-linear effects of the features in the output.[^1] They are also model dependent.

Let's describe these effects.

**Collinearity**: one feature is a linear combination of one or more other features. For example, $x_3 = \beta_2 x_2 + \beta_1 x_1 + \beta_0$; assuming linear independence would be an error.

>[!important]
> The effect here is quite drastic. Two highly correlated features may result _high_ importance or weight (SHAP or LIME, respectively) for one and _low_ to the other one. And this importance may be reversed or just different between models (or training runs).

**Non-linearity**: output changes are not proportional to input changes. For example $y = \beta x^N$ is non-linear, and fitting a line $y' = \alpha x$ to it would be inaccurate. Some SHAP models can model this correctly.

Luckily, we can get some help:

- Normalised Moving Rate (NMR): assesses the stability of the list against the collinearity. Smaller NMR means more stable ordering. The method is just a robustness-test, it does not update the parameters.

- Modified Index Position (MIP) can be used to address just that, and re-order the importance of features considering their multicollinearity.

### Other methods

- Linear Proxy Models: Fits a surrogate linear model to the original. For example, Local Interpretable Model Agnostic Explanation (LIME) and Generalised Linear Models (GLMs).
    - LIME does local explanations (for a given input) only.
- Salience Maps: aim to explain which portions of the computation (original model) are most important for different inputs.
- Validity Interval Analysis: another technique fitting the NN behaviour to try to extract explanations.
- Principal Component Analysis, Independent Component Analysis, Non-negative Matrix Factorisation can all help as well. But in a way this is better done by architectures with disentangled representations.

## Explanation-Producing systems

Architectures designed to make explaining part of their operation easier.

- Using Explicit Attention: An attention layer/mask learns how parts of an input embedding pay attention to other parts. The layer is somewhat interpretable. In chemistry, it could learn which atoms connect (or pay attention to) other atoms.

- Dissentangled Representations: "Disentangled representations have individual dimensions that describe meaningful and independent factors of variation." from [Explaining Explainability][XX], 2018. Examples of architectures are $\beta$-VAE, INFOGan, capsule networks.

[XX]: http://arxiv.org/abs/1806.00069
[SHAP AND LIME]: https://onlinelibrary.wiley.com/doi/abs/10.1002/aisy.202400304
[^1]: Although some strategies do take non-linearity into account.
