# Explainable AI - Strategies

First, strategies for deep learning models are described. Second, for classical machine learning models.

## Deep learning models

### Intrinsic or Representation Methods

Interpreting the learnt representations and data inside the model (intrinsic) with questions such as _what information does the network contain?_.

They classify these at the level of Layer, Neuron, and Vector.

- **Role of Layers**: for example, transfer learning, reusing output of some layers for another task.
- **Role of Units**: <q>The role of such individual units can be understood qualitatively, by creating visualizations of the input patterns that maximize the response of a single unit, or quantitatively, by testing the ability of a unit to solve a transfer problem.</q> from [Explaining Explainability][XX], 2018.
- **Role of Vectors**: for example using Concept Activation Vectors framework.

Another way is to introduce biases like symmetry considerations which can help interpretability.

### Extrinsic or Processing Methods

Many of these methods measure the feature importance in determining the output, like are SHAP and LIME. In the most basic form, both methods fail to capture multicollinearity between features, and non-linear effects of the features in the output.

#### Shapley Additive Explanations (SHAP)

Calculates a score (SHAP values) for each feature in the model, representing the contribution of that feature to the model's output.

- **Pitfall 1**: The feature-contribution is not a weight or derivative with respect to the inputs. The main focus should be on the order of values (Paper, [Section 2.1][SHAP AND LIME]),
- **Pitfall 2**: It is model dependent: two models trained with same data may have different ranking,
- **Pitfall 3**: does not protect from a biased model,
- It Applies to the model as-is;
- Assumes features are independent (that there is no correlation), it offers both global (average across instances) and local (instance), but still looks at the model as black box.

#### Mathematical Aspects

In their basic form, neither SHAP nor LIME account for feature collinearity or non-linear dependencies across features.[^1]

We can use LIME to illustrate this. A linear model is described by $y(\mathbf{x}) = \alpha_0 + \sum_{i=1}^n \alpha_i x_i$ each $\alpha_i$ being a coefficient and each $x_i$ a feature. For $n=1$ we have just a line in 2D, for $n=2$ a plane in 3D, for $n>2$ we have a n-dimensional hyperplane in n+1 dimensions.

The issues can be captured imagining a plane in 3D.

**Collinearity**: one feature is a linear combination of one or more other features. For example, $x_3 = \beta_2 x_2 + \beta_1 x_1 + \beta_0$; assuming linear independence would be an error.

>[!important]
> The effect here is quite drastic! Two highly correlated features may result _high_ importance or weight (SHAP or LIME, respectively) for one and _low_ to the other one. And this importance may be reversed or just different between models (or training runs).

**Non-linearity**: output changes are not proportional to input changes. For example $y = \beta x^N$ is non-linear, and fitting a line $y' = \alpha x$ to it would be inaccurate. Some SHAP models can model this correctly.

Luckily, we can get some help:

- Normalised Moving Rate (NMR) can be used to assess the stability of the ordering. Intuitively, removing one shouldn't affect the order of the rest, unless there was correlation. Smaller NMR means more stable ordering.

- Modified Index Position (MIP) can be used to re-order the importance of features considering their multicollinearity.

#### Other methods

- Linear Proxy Models: Fits a surrogate linear model to the original. For example, Local Interpretable Model Agnostic Explanation (LIME) and Generalised Linear Models (GLMs).
- Salience Maps: aim to explain which portions of the computation (original model) are most important for different inputs.
- Validity Interval Analysis: another technique fitting the NN behaviour to try to extract explanations.
- Principal Component Analysis, Independent Component Analysis, Non-negative Matrix Factorisation can all help as well. But in a way this is better done by architectures with disentangled representations.

### Explanation-Producing systems

Architectures designed to make explaining part of their operation easier.

- Using Explicit Attention: An attention layer/mask learns how parts of an input embedding pay attention to other parts. The layer is somewhat interpretable. In chemistry, it could learn which atoms connect (or pay attention to) other atoms.

- Dissentangled Representations: "Disentangled representations have individual dimensions that describe meaningful and independent factors of variation." from [Explaining Explainability][XX], 2018. Examples of architectures are $\beta$-VAE, INFOGan, capsule networks.

## Classical Machine Learning

### Intrinsic Methods

For an example of Classical ML think of Support Vector Regression, and other kinds of regressions.

These focuses on the math (internal structure).

- Simplifying the model (when possible)
    - Regularisation Approaches (SISSO, LASSO) can help by identifying the most important descriptors to use.
    - LASSO: removes tightly correlated features (leaving the most helpful one).

### Extrinsic Methods

These study the model's behaviour, as a black box. Most below, correlate changes in input-features with changes in outputs.

- Partial Dependence Plots (PDPs). Though it masks possible correlations between features (if all are kept constant but one).
- Individual Conditional Expectations (ICE) overcomes the limitation above.
- Feature Importance methods: partial derivative of an output w.r.t some input feature.[^2]
- Shapley Analysis: fits a linear model to nearby input-points.
    - The coefficients of the linear fit quantify the contribution / effect of each input feature to the output value.
    - We get insight on which features are locally relevant, by looking at the accompanying coefficients.
    - Question: They fit different models to different areas of their input space, and then analyze the distribution of coefficients?
- Counterfactual Analysis

<div class="center w40"> <!--other classes: w220, w420-->
    <a href="../assets/linear_model_and_shapley.jpeg">
    <img src="../assets/linear_model_and_shapley.jpeg" alt="Linear Approximation Model (Generalised) and Shapley's contributions"/>
    </a>
    <p>
    LGM ($g$ function) and Shapley's feature contribution. Image (cropped) from <a href="https://pubs.acs.org/doi/10.1021/accountsmr.1c00244">paper</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-SA 4.0</a>
    </p>
</div>

[XX]: http://arxiv.org/abs/1806.00069
[SHAP AND LIME]: https://onlinelibrary.wiley.com/doi/abs/10.1002/aisy.202400304
[^1]: Although some strategies do take non-linearity into account.
[^2]: This I think can be done also numerically, without actually calculating the derivative. See refs 20 and 21 in the paper for more detail.
