# Explainable AI - Strategies

Now let's get into strategies that can help explain models better.
First, for Deep Learning, then the same is done for Classical Machine Learning.

## Deep Learning

### Intrinsic or Representation Methods

These help us to interpret the learnt representations and data inside the model (intrinsic).

They help answer the question: _What information does the network contain?_

They classify these at the level of Layer, Neuron, and Vector.

- Role of Layers: for example, transfer learning, reusing output of some layers for another task.
- Role of Units: "visualizations of the input patterns that maximize the response of a single unit or quantitatively, by testing the ability of a unit to solve a transfer problem" ([source][arxiv]).
- Role of Vectors: for example using Concept Activation Vectors framework.

Another way is to introduce biases like symmetry considerations which can help interpretability.

### Extrinsic or Processing Methods

These relate to how the model processes _an input_ (extrinsic) and in a way we look at the model as a black box.

- Linear Proxy Models: fit a simpler model to the neighbourhood of an input (+ noise), i.e $g(z) \approx f(z)$ around some $z$. For example, LIME or Generalised Linear Models (GLMs).

- Salience Maps: aim to explain which portions of the computation (original model) are most important for different inputs.

- Validity Interval Analysis: another technique fitting the NN behaviour to try to extract explanations.

- Principal Component Analysis, Independent Component Analysis, Non-negative Matrix Factorisation can all help as well. But in a way this is better done by architectures with disentangled representations.

### Explanation-Producing systems

Architectures designed to make explaining part of their operation easier.

- Using Explicit Attention: An attention layer/mask learns how parts of an input embedding pay attention to other parts. The layer is somewhat interpretable. In chemistry, it could learn which atoms connect (or pay attention to) other atoms.

- Dissentangled Representations: "Disentangled representations have individual dimensions that describe meaningful and independent factors of variation." ([source][arxiv]). Examples of architectures are Beta-VAE, INFOGan, capsule networks.

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
- Feature Importance methods: partial derivative of an output w.r.t some input feature.[^1]
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

[arxiv]: http://arxiv.org/abs/1806.00069
[^1]:  This I think can be done also numerically, without actually calculating the derivative. See refs 20 and 21 in the paper for more detail.
