# Explainable AI

These are some of my opinions and ideas after reading [Interpretable and Explainable Machine Learning for Materials Science and Chemistry][Account] (2022), and [Explaining Explanations: An Overview of Interpretability of Machine Learning][arxiv] (2019).

A very interesting experiment in terms of explainability was <https://distill.pub>.

--------------------

## Explanations

Scientific models are expected to be explainable; that is, an expert human can respond to _why_ questions with it and about it.

And yet, deep learning models' operation remains opaque.
So how can we explain deep-learning models? That is what this blog explores.

(Admittedly, in some cases we may be satisfied with the predictive power alone.)

### Definition and characteristics

_Explanation_ can be defined in an intuitive way. First, phrase what we want to know as a "Why question", the answer is a candidate-explanation. Keep asking "Why" until satisfied. Call the process an explanation.

We can characterise explanations using:

- _Simplicity_: how easy to understand the explanation is. (The opposite term, _complexity_, could be used as well.)
- _Completeness_: how accurately it describes the model's behaviour.

<div class="w420 center">
<a href="./assets/tradeoff.png">
<img style="display:inline-block" src="./assets/tradeoff.png"/>
</a>
<p>Completeness/Simplicity tradeoff graph.</p>
</div>

>[!NOTE]
> This isn't universal but just a common case. Some phenomena are simple, and both characteristics are high.

A related dimension is _correctness_, which does not belong to explaining a model, but is of high importance. A 3D radar plot is included in the linked above, and reproduced below (_simplicity_ maps to _understandability_):

<div class="center w420"> <!--other classes: w220, w420-->
    <a href="./assets/radar_plot.png">
    <img src="./assets/radar_plot.png" alt="Plot of the three dimensions"/>
    </a>
    <p>
    Image from <a href="https://pubs.acs.org/doi/10.1021/accountsmr.1c00244">Original Paper</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-SA 4.0</a>
    </p>
</div>

## Strategies

We consider strategies that can help explain models' operations.
First, Deep Learning (DL) intrinsic and extrinsic methods. Then the same is done for Classical ML.

### DL / Intrinsic or Representation

Interpret the learnt representations and data inside the model (i.e intrinsic). _What information does the network contain?_

They classify these at the level of Layer, Neuron, and Vector.

- Role of Layers: for example, transfer learning, reusing output of some layers for another task.
- Role of Units: "visualizations of the input patterns that maximize the response of a single unit or quantitatively, by testing the ability of a unit to solve a transfer problem".
- Role of Vectors: for example using Concept Activation Vectors framework.

### DL / Extrinsic or Processing

How the model processes an input (extrinsic).

- Linear Proxy Models: fit a simpler model to the neighbourhood of an input (+ noise), i.e $g(z) \approx f(z)$ around some $z$. For example, LIME or Generalised Linear Models (GLMs).

- Salience Maps: aim to explain which portions of the computation (original model) are most important for different inputs.

- Validity Interval Analysis: another technique fitting the NN behaviour to try to extract explanations.

### Explanation-Producing systems

Architectures designed to make explaining part of their operation easier.

- Using Explicit Attention: For example the transformer operates upon an embedding, like an atom embedding, and learns which parts pay attention to other parts. These are called _attention masks_ and are somewhat interpretable.

<div class="center w420"> <!--other classes: w220, w420-->
    <a href="./assets/attention.png">
    <img src="./assets/attention.png" alt="Example of a simple transformer network."/>
    </a>
    <p>
    Explicit attention example. Image from <a href="https://pubs.acs.org/doi/10.1021/accountsmr.1c00244">Original Paper</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-SA 4.0</a>
    </p>
</div>

The [paper][Account] continues (bold is mine):

> _attention masks_, can be interpreted in similar way to salience maps and **determine sections of the input data that a model exploits for making predictions**.

- Dissentangled Representations:

### Classical ML / Intrinsic

For an example of Classical ML think of Support Vector Regression, and other kinds of regressions.

These focuses on the math (internal structure).

- Simplifying the model (when possible)
    - Regularisation Approaches (SISSO, LASSO) can help by identifying the most important descriptors to use.
    - LASSO: removes tightly correlated features (leaving the most helpful one).

### Classical ML / Extrinsic

These study the model's behaviour, as a black box.

- Correlate changes in input-features with changes in outputs.
    - Partial Dependence Plots (PDPs). Though it masks possible correlations between features (if all are kept constant but one).
    - Individual Conditional Expectations (ICE) overcomes the limitation above.
    - Feature Importance methods: partial derivative of an output w.r.t some input feature.[^1]
    - Shapley Analysis: involves fitting a linear model using nearby input-points.
        - We get insight on which features are locally relevant, by looking at the accompanying coefficients.
        - The coefficients quantify the effect of each feature in the output. I assume they fit different models to different areas of their input space, and then analyze the distribution of coefficients?
    - Counterfactual Analysis

The image below is from the paper, under [CC BY 4.0] (cropped) showing the Linear Generalised Model and the Shapley's contributions from different features (how much each feature affects the output).

<div class="center w420"> <!--other classes: w220, w420-->
    <a href="./assets/linear_model_and_shapley.jpeg">
    <img src="./assets/linear_model_and_shapley.jpeg" alt="Linear Approximation Model (Generalised) and Shapley's contributions"/>
    </a>
    <p>
    Image from <a href="https://pubs.acs.org/doi/10.1021/accountsmr.1c00244">Original Paper</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-SA 4.0</a>
    </p>
</div>

[Account]: https://pubs.acs.org/doi/10.1021/accountsmr.1c00244
[arxiv]: http://arxiv.org/abs/1806.00069
[CC BY 4.0]: https://creativecommons.org/licenses/by/4.0/
[^1]:  This I think can be done also numerically, without actually calculating the derivative. See refs 20 and 21 in the paper for more detail.
