# Model Explainability

Explanations were defined and characterised in the previous post.

In Explainable AI (XAI), what primarily needs explanation is the model. _Model explainability_ can be defined as:

> The degree to which we can answer questions about the model's inner working and outputs.

The goal is to explain a model, and do it to some audience (which could be ourselves).

Explainability is made harder with more accurate models, since they tend to be more complex.

<div class="center w30">
    <a href="../assets/tradeoff.webp">
    <img src="../assets/tradeoff.webp" alt="Model Explainability vs Model accuracy tradeoff."/>
    </a>
    <p>Model accuracy vs Model explainability tradeoff.</p>
</div>

Moreover, simple explanations can **oversimplifying** its operation, or lack **generality**.

## Explaining by Comparison

This framework is explained separately from methods to expand a bit more, but some of the methods are based on this logic behind.

### A toy example

Let's take an imaginary model and its predictions: $y = f(\mathbf{x})$. It is expected to be accurate and robust.

Suppose this is modelling weather, and using whether people take an umbrella as input variable. It reaches high accuracy and we are happy.

If we wanted to answer, what if the persons didn't take the umbrella? It does still rain. Why? There may be different reasons:

1. The model is doing correlation/association, but there wasn't correlation data available for such an event, so the predictions bad;
2. The model does not use causal information, like a weather forecast model would (not taking an umbrella doesn't make raining impossible).

Let's say we change it to use causal variables instead. In this case, we are implicitly adding a _causal model_.

But how do we know that we have _all_ the _causal inputs_? And how do we know it has built an accurate _and also robust_ model of the world?

In some cases, a subset of variables will be enough to get a good approximation. We expect the causal models harder to create but also more robust for generalising out of distribution.

So, getting to a causal model isn't easy, nor guaranteed to be complete. In some cases, we may even be just fine with a correlation model, but we should distinguish them.

An expert may pick known causes-effects pairs as inputs-outputs to train a model. A non-expert, may not know which are the causes and this _can_ be problematic (we may be building a correlation model).

### Comparing

So far, we dealt with _generalisation_, not with _explanation_ of a model. The reason is that generalisation out of distribution is connected to causal models &mdash;those going beyond correlation.

But how do we _explain_ such models? This is where counterfactuals can help. And more broadly, _comparing_ how different inputs and their outputs.

_Counterfactuals_ can be used for generating explanations: asking _what if this other input was used instead_, or what if one feature is changed slightly? Such are counterfactual-like questions (if the initial input is considered a fact). We can use counterfactuals either changing features of the input (even if this makes it novel), or comparing with reference inputs.

Both of these are known techniques listed in the [overview of methods][overview-of-methods] (next section).

<!-- (A logic-inference section could be added, but at the moment I don't see it adding much useful information.) -->

## Overview of methods

Within the _cognitive process_ of explanations, _model explainability_ benefits from methods to identify causes or relevant properties.

For all audiences, we can group these methods into more general categories, and then go into specific cases for a certain audience.

### Kinds of Methods

The survey [Principles and practise of explaining ML models][principles_and_practice] includes a table of **method kinds**. A modified version of the table is below:

| Kind         | Advantages    | Disadvantages | Question |
|---------------------|---------------|---------------|----------|
| **Local explanations** | Explains the model's behaviour in a local area of interest. Operates on instance-level explanations. | Explanations do not generalize on a global scale. Small **perturbations** might result in very different explanations.| How do small perturbations affect the output / prediction? |
| **Examples**      | Representative items for each class provide insights about the model's internal reasoning. | Examples require human selection. They do not explicitly state what parts of the example influence the model. | How do inputs from different classes compare? And same? |
| **Feature relevance** | They operate on an instance level (some can operate globally). | Methods may make assumptions which do not hold (e.g. feature independence, linearity).| Which input features are most important? |
| **Simplification**  | Simple surrogate models explain opaque ones. | Surrogate models may not approximate original models well. | Can we get local insights by using a simpler model? |
| **Visualizations**  | Easier to communicate to non-technical audiences. Most approaches are intuitive and not hard to implement. | There is an upper bound on how many features can be considered at once. Humans must inspect plots to derive explanations. | Class boundaries? |

We should remember that:

> Relying on only one technique will only give us a partial picture of the whole story, possibly missing out important information. Hence, combining multiple approaches together provides for a more cautious way to explain a model. (...) At this point we would like to note that there is no established way of combining techniques (in a pipeline fashion),

In the next posts, we focus on **methods** that aid _causal attribution_ (or cognitive process) with a scientific audience in mind.

### Map of XAI

An interesting map of XAI is given in the survey [Principles and practice of explainable ML][principles_and_practice] (2021).

Most _classic ML_ models are in the <span style="padding:0.15rem; display: inline-block; border-radius:0.5rem; border:0.15rem dashed purple">dashed</span> area under **Model types** column.

_Classic ML_ models are usually _transparent_ (intrinsically explainable) but _may_ benefit from post-hoc (post training) explanations, such as visualising it. When transparency is key and the predictions are accurate enough, these may be preferred over DL models.

<div class="center w50">
    <a href="../assets/taxonomy.webp">
    <img src="../assets/taxonomy.webp" alt="Complex Graph linking prediction models such as SVMs, kinds of explanations such as text or graph, and explanation methods such as SHAP."/>
    </a>
    <p>
    Image from <a href="https://www.frontiersin.org/journals/big-data/articles/10.3389/fdata.2021.688969/full">paper</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY</a>
    </p>
</div>

The focus here though, is explaining _deep learning_ models. These are usually _opaque_ ("_black-box_") models, and their accuracy is usually higher than classic ML models.

In other words, classical ML and DL models each have their use-cases.

-------------------

<details>
<summary>List of sources used in this blogpost</summary>

1. [Principles and practice of explainable machine-learning][principles_and_practice] (2021, 25 pages): Sections 8&ndash;11 are a useful review of explainability methods.
2. [The Book of Why][https://en.wikipedia.org/wiki/The_Book_of_Why] (2018): The introduction and first chapter were read in detail, only the part of interest for XAI (to my judgement) is discussed here, comparison and counterfactuals. It's interesting but may be more useful in other areas (like medical sciences, economics etc.)

</details>

<!-- Also, a very interesting experiment in terms of explainability was <https://distill.pub>. -->

[principles_and_practice]: https://www.frontiersin.org/journals/big-data/articles/10.3389/fdata.2021.688969/full
