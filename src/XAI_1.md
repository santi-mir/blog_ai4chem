# Explainable AI - Concepts

```mermaid

flowchart LR
    A["ML Model"] --> B["Explainable"]
    A --> C["Not Explainable"]
    B --> D["Intrinsically (Internals)"]
    B --> E["Extrinsically (Black box, I/O relation)"]

```

These are some of my opinions and ideas after reading [Interpretable and Explainable Machine Learning for Materials Science and Chemistry][Account] (2022), and [Explaining Explanations: An Overview of Interpretability of Machine Learning][arxiv] (2019).

A very interesting experiment in terms of explainability was <https://distill.pub>.

--------------------

## Explanations

Scientific models are expected to be explainable; that is, an expert human can respond to _why_ questions about it.

And yet, deep learning models' operation remains opaque.
So how can we explain deep-learning models? That is what this blog explores.

(Admittedly, in some cases we may be satisfied with the predictive power alone.)

### Definition and characteristics

_Explanation_ can be defined in an intuitive way. First, phrase what we want to know as a "Why question", the answer is a candidate-explanation. Keep asking "Why" until satisfied. Call the process an explanation.

We can characterise explanations using:

- _Simplicity_: how easy to understand the explanation is. (The opposite term, _complexity_, could be used as well.)
- _Completeness_: how accurately it describes the model's behaviour.

<div class="w40 center">
<a href="./assets/tradeoff.png">
<img alt="graph looking like completeness is the inverse of simplitity." src="./assets/tradeoff.png"/>
</a>
<p>Completeness v. Simplicity tradeoff.</p>
</div>

This tradeoff isn't universal but just a common case. Some phenomena are simple, in which case both characteristics are high.

### Correctness

This isn't a characteristic of explanations, but of a model, yet it is often correlated, as represented below (_understandability_ replaces _simplicity_):

<div class="center w40"> <!--other classes: w220, w420-->
    <a href="./assets/radar_plot.png">
    <img src="./assets/radar_plot.png" alt="Plot of the three dimensions"/>
    </a>
    <p>
    Image from <a href="https://pubs.acs.org/doi/10.1021/accountsmr.1c00244">paper</a> under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY-SA 4.0</a>
    </p>
</div>

[Account]: https://pubs.acs.org/doi/10.1021/accountsmr.1c00244
[arxiv]: http://arxiv.org/abs/1806.00069
