"use client";

import React, { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const jargon = [
    { term: "Activation Function", definition: "A function in a neural network that defines the output of a node given a set of inputs. Examples include ReLU, Sigmoid, and Tanh.", link: "https://en.wikipedia.org/wiki/Activation_function" },
    { term: "Adversarial Attack", definition: "A technique to fool a machine learning model by providing deceptive input.", link: "https://en.wikipedia.org/wiki/Adversarial_machine_learning" },
    { term: "Autoencoder", definition: "A type of artificial neural network used to learn efficient data codings in an unsupervised manner. The aim of an autoencoder is to learn a representation (encoding) for a set of data, typically for dimensionality reduction.", link: "https://en.wikipedia.org/wiki/Autoencoder" },
    { term: "Backpropagation", definition: "The algorithm used to train neural networks. It calculates the gradient of the loss function with respect to the network's weights, allowing for efficient weight updates.", link: "https://en.wikipedia.org/wiki/Backpropagation" },
    { term: "Batch Normalization", definition: "A technique to improve the performance and stability of neural networks by normalizing the inputs of each layer.", link: "https://arxiv.org/abs/1502.03167" },
    { term: "Batch Size", definition: "The number of training examples utilized in one iteration (or epoch).", link: "https://machinelearningmastery.com/difference-between-a-batch-and-an-epoch/" },
    { term: "Bayesian Inference", definition: "A method of statistical inference where Bayes' theorem is used to update the probability for a hypothesis as more evidence becomes available.", link: "https://en.wikipedia.org/wiki/Bayesian_inference" },
    { term: "BERT (Bidirectional Encoder Representations from Transformers)", definition: "A powerful language representation model by Google that has achieved state-of-the-art results on a wide array of Natural Language Processing tasks.", link: "https://arxiv.org/abs/1810.04805" },
    { term: "Bias", definition: "An offset or intercept term in a machine learning model. It helps the model fit the data better.", link: "https://en.wikipedia.org/wiki/Bias_(statistics)" },
    { term: "Bias (Ethics)", definition: "Systematic prejudice in a model's outputs, often reflecting societal or historical inequities present in the training data.", link: "https://en.wikipedia.org/wiki/Algorithmic_bias" },
    { term: "Bias (Statistics)", definition: "The difference between the average prediction of our model and the correct value which we are trying to predict. High bias can cause an algorithm to miss the relevant relations between features and target outputs (underfitting).", link: "https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff" },
    { term: "Bias-Variance Tradeoff", definition: "A fundamental concept in machine learning. A model with high bias is too simple and underfits, while a model with high variance is too complex and overfits. The tradeoff is about finding the right balance.", link: "https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff" },
    { term: "Big Data", definition: "Extremely large and complex datasets that cannot be easily managed or processed with traditional data-processing application software.", link: "https://en.wikipedia.org/wiki/Big_data" },
    { term: "Binary Classification", definition: "A classification task that involves predicting one of two possible outcomes (e.g., spam or not spam).", link: "https://en.wikipedia.org/wiki/Binary_classification" },
    { term: "Binary Cross-Entropy", definition: "A loss function used for binary classification tasks.", link: "https://en.wikipedia.org/wiki/Cross_entropy" },
    { term: "Boosting", definition: "An ensemble learning technique that combines a set of weak learners into a single strong learner.", link: "https://en.wikipedia.org/wiki/Boosting_(machine_learning)" },
    { term: "Categorical Cross-Entropy", definition: "A loss function used for multi-class classification tasks.", link: "https://en.wikipedia.org/wiki/Cross_entropy" },
    { term: "Categorical Variable", definition: "A variable that can take on one of a limited, and usually fixed, number of possible values, assigning each individual or other unit of observation to a particular group or nominal category on the basis of some qualitative property.", link: "https://en.wikipedia.org/wiki/Categorical_variable" },
    { term: "Chatbot", definition: "A computer program designed to simulate conversation with human users, especially over the Internet.", link: "https://en.wikipedia.org/wiki/Chatbot" },
    { term: "Classification", definition: "A type of supervised learning problem where the goal is to predict a categorical label. For example, classifying an email as 'spam' or 'not spam'.", link: "https://en.wikipedia.org/wiki/Statistical_classification" },
    { term: "Clustering", definition: "An unsupervised learning task that involves grouping a set of objects in such a way that objects in the same group (or cluster) are more similar to each other than to those in other groups.", link: "https://en.wikipedia.org/wiki/Cluster_analysis" },
    { term: "Computer Vision", definition: "A field of artificial intelligence that trains computers to interpret and understand the visual world.", link: "https://en.wikipedia.org/wiki/Computer_vision" },
    { term: "Confusion Matrix", definition: "A table used to describe the performance of a classification model. It shows the number of true positives, true negatives, false positives, and false negatives.", link: "https://en.wikipedia.org/wiki/Confusion_matrix" },
    { term: "Continuous Variable", definition: "A variable that can take on any value within a given range.", link: "https://en.wikipedia.org/wiki/Continuous_or_discrete_variable" },
    { term: "Convolutional Neural Network (CNN)", definition: "A class of deep neural networks, most commonly applied to analyzing visual imagery. They are known for their ability to detect features in images.", link: "https://en.wikipedia.org/wiki/Convolutional_neural_network" },
    { term: "Cost Function", definition: "Also known as a loss function, it measures the difference between the model's predictions and the actual labels. The goal of training is to minimize this function.", link: "https://en.wikipedia.org/wiki/Loss_function" },
    { term: "Cross-Validation", definition: "A resampling procedure used to evaluate machine learning models on a limited data sample. A common method is k-fold cross-validation.", link: "https://en.wikipedia.org/wiki/Cross-validation_(statistics)" },
    { term: "Data Augmentation", definition: "A technique to increase the diversity of your training data by applying random (but realistic) transformations such as image flipping or rotation.", link: "https://machinelearningmastery.com/how-to-configure-image-data-augmentation-when-training-deep-learning-neural-networks/" },
    { term: "Data Mining", definition: "The process of discovering patterns in large data sets involving methods at the intersection of machine learning, statistics, and database systems.", link: "https://en.wikipedia.org/wiki/Data_mining" },
    { term: "Data Preprocessing", definition: "The process of cleaning, transforming, and preparing raw data for machine learning model training.", link: "https://en.wikipedia.org/wiki/Data_pre-processing" },
    { term: "Dataset", definition: "A collection of data. In machine learning, it is typically split into training, validation, and test sets.", link: "https://en.wikipedia.org/wiki/Data_set" },
    { term: "Decision Tree", definition: "A supervised learning algorithm that uses a tree-like model of decisions and their possible consequences.", link: "https://en.wikipedia.org/wiki/Decision_tree" },
    { term: "Deep Learning", definition: "A subfield of machine learning based on artificial neural networks with many layers (deep neural networks).", link: "https://en.wikipedia.org/wiki/Deep_learning" },
    { term: "Dimensionality Reduction", definition: "The process of reducing the number of random variables under consideration by obtaining a set of principal variables.", link: "https://en.wikipedia.org/wiki/Dimensionality_reduction" },
    { term: "Dropout", definition: "A regularization technique for reducing overfitting in neural networks by preventing complex co-adaptations on training data. It involves randomly setting a fraction of neuron activations to zero during training.", link: "https://arxiv.org/abs/1207.0580" },
    { term: "Ensemble Learning", definition: "A machine learning technique where multiple models (often called 'weak learners') are trained to solve the same problem and combined to get better results.", link: "https://en.wikipedia.org/wiki/Ensemble_learning" },
    { term: "Epoch", definition: "One complete pass through the entire training dataset.", link: "https://machinelearningmastery.com/difference-between-a-batch-and-an-epoch/" },
    { term: "Exploding Gradient Problem", definition: "The opposite of the vanishing gradient problem, where the gradients of the loss function become very large, leading to unstable training.", link: "https://en.wikipedia.org/wiki/Vanishing_gradient_problem" },
    { term: "F1 Score", definition: "A measure of a model's accuracy on a dataset. It is the harmonic mean of precision and recall.", link: "https://en.wikipedia.org/wiki/F-score" },
    { term: "Feature", definition: "An individual measurable property or characteristic of a phenomenon being observed. In machine learning, features are the inputs to your model.", link: "https://en.wikipedia.org/wiki/Feature_(machine_learning)" },
    { term: "Feature Engineering", definition: "The process of using domain knowledge to create features that make machine learning algorithms work better.", link: "https://en.wikipedia.org/wiki/Feature_engineering" },
    { term: "Fine-tuning", definition: "The process of taking a pre-trained model and training it further on a smaller, specific dataset.", link: "https://en.wikipedia.org/wiki/Fine-tuning_(deep_learning)" },
    { term: "GAN (Generative Adversarial Network)", definition: "A class of machine learning frameworks where two neural networks (a generator and a discriminator) contest with each other in a zero-sum game.", link: "https://arxiv.org/abs/1406.2661" },
    { term: "Generative Adversarial Network (GAN)", definition: "A class of machine learning frameworks where two neural networks, a generator and a discriminator, contest with each other in a zero-sum game.", link: "https://arxiv.org/abs/1406.2661" },
    { term: "GPT (Generative Pre-trained Transformer)", definition: "A family of language models developed by OpenAI, known for their ability to generate human-like text.", link: "https://openai.com/research/gpt" },
    { term: "Gradient Clipping", definition: "A technique to mitigate the exploding gradient problem by capping the maximum value of the gradients.", link: "https://machinelearningmastery.com/exploding-gradients-in-neural-networks/" },
    { term: "Gradient Descent", definition: "An optimization algorithm used to minimize a function by iteratively moving in the direction of the steepest descent as defined by the negative of the gradient.", link: "https://en.wikipedia.org/wiki/Gradient_descent" },
    { term: "Grid Search", definition: "A technique for hyperparameter tuning that exhaustively searches through a manually specified subset of the hyperparameter space.", link: "https://en.wikipedia.org/wiki/Hyperparameter_optimization" },
    { term: "Hyperparameter", definition: "A parameter whose value is set before the learning process begins. Examples include the learning rate, the number of epochs, and the batch size.", link: "https://en.wikipedia.org/wiki/Hyperparameter_(machine_learning)" },
    { term: "ImageNet", definition: "A large visual database designed for use in visual object recognition software research. It contains over 14 million hand-annotated images.", link: "https://www.image-net.org/" },
    { term: "Imbalanced Data", definition: "A situation where the classes in a classification dataset are not represented equally.", link: "https://machinelearningmastery.com/what-is-imbalanced-classification/" },
    { term: "Inference", definition: "The process of using a trained model to make predictions on new, unseen data.", link: "https://en.wikipedia.org/wiki/Statistical_inference" },
    { term: "Jupyter Notebook", definition: "An open-source web application that allows you to create and share documents that contain live code, equations, visualizations, and narrative text.", link: "https://jupyter.org/" },
    { term: "K-Means Clustering", definition: "A popular unsupervised learning algorithm used to partition a dataset into K pre-defined, non-overlapping subgroups (clusters).", link: "https://en.wikipedia.org/wiki/K-means_clustering" },
    { term: "K-Nearest Neighbors (KNN)", definition: "A simple, supervised machine learning algorithm that can be used for both classification and regression tasks. It classifies a new data point based on the majority class of its k-nearest neighbors.", link: "https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm" },
    { term: "Label", definition: "The output or the 'answer' part of a data point in supervised learning. For example, in a dataset of cat and dog images, the labels would be 'cat' and 'dog'.", link: "https://en.wikipedia.org/wiki/Labeled_data" },
    { term: "Large Language Model (LLM)", definition: "A type of neural network model trained on vast amounts of text data, capable of understanding and generating human-like text.", link: "https://en.wikipedia.org/wiki/Large_language_model" },
    { term: "Learning Rate", definition: "A hyperparameter that controls how much to change the model in response to the estimated error each time the model weights are updated.", link: "https://en.wikipedia.org/wiki/Learning_rate" },
    { term: "Linear Regression", definition: "A linear approach to modeling the relationship between a scalar response and one or more explanatory variables.", link: "https://en.wikipedia.org/wiki/Linear_regression" },
    { term: "Logistic Regression", definition: "A statistical model used for binary classification tasks, predicting the probability of a binary outcome.", link: "https://en.wikipedia.org/wiki/Logistic_regression" },
    { term: "Long Short-Term Memory (LSTM)", definition: "A special kind of RNN, capable of learning long-term dependencies. They are particularly well-suited for time series data.", link: "https://en.wikipedia.org/wiki/Long_short-term_memory" },
    { term: "Loss Function", definition: "A function that measures the difference between the model's prediction and the actual label. The goal of training is to minimize this function. Also known as Cost Function or Objective Function.", link: "https://en.wikipedia.org/wiki/Loss_function" },
    { term: "Machine Learning", definition: "A field of artificial intelligence that uses statistical techniques to give computer systems the ability to 'learn' from data, without being explicitly programmed.", link: "https://en.wikipedia.org/wiki/Machine_learning" },
    { term: "Machine Learning (ML)", definition: "A field of artificial intelligence that gives computers the ability to learn without being explicitly programmed.", link: "https://en.wikipedia.org/wiki/Machine_learning" },
    { term: "Mean Absolute Error (MAE)", definition: "A metric for measuring the average magnitude of the errors in a set of predictions, without considering their direction.", link: "https://en.wikipedia.org/wiki/Mean_absolute_error" },
    { term: "Mean Squared Error (MSE)", definition: "A metric for measuring the average of the squares of the errors—that is, the average squared difference between the estimated values and the actual value.", link: "https://en.wikipedia.org/wiki/Mean_squared_error" },
    { term: "Model", definition: "The output of a machine learning algorithm run on data. It represents the learned patterns and is used to make predictions.", link: "https://en.wikipedia.org/wiki/Machine_learning_model" },
    { term: "Multi-class Classification", definition: "A classification task with more than two classes.", link: "https://en.wikipedia.org/wiki/Multiclass_classification" },
    { term: "Natural Language Processing (NLP)", definition: "A subfield of linguistics, computer science, and artificial intelligence concerned with the interactions between computers and human language.", link: "https://en.wikipedia.org/wiki/Natural_language_processing" },
    { term: "Neural Network", definition: "A series of algorithms that endeavors to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates.", link: "https://en.wikipedia.org/wiki/Neural_network" },
    { term: "Neuron", definition: "The basic unit of a neural network. It receives input, processes it, and passes the result to the next layer.", link: "https://en.wikipedia.org/wiki/Artificial_neuron" },
    { term: "Objective Function", definition: "See Loss Function.", link: "https://en.wikipedia.org/wiki/Loss_function" },
    { term: "One-Hot Encoding", definition: "The process of converting categorical data variables so they can be provided to machine learning algorithms to improve predictions.", link: "https://en.wikipedia.org/wiki/One-hot" },
    { term: "Overfitting", definition: "A modeling error that occurs when a function is too closely fit to a limited set of data points. The model learns the training data so well that it performs poorly on new, unseen data.", link: "https://en.wikipedia.org/wiki/Overfitting" },
    { term: "Parameter", definition: "The variables of the model that are learned from the data during training. For example, the weights and biases in a neural network.", link: "https://en.wikipedia.org/wiki/Parameter" },
    { term: "Precision", definition: "A metric that measures the accuracy of the positive predictions. It is the ratio of true positives to the total number of positive predictions.", link: "https://en.wikipedia.org/wiki/Precision_and_recall" },
    { term: "Pre-trained Model", definition: "A model that was trained on a large benchmark dataset for a similar task. It can be used as a starting point for a new model (see Fine-tuning).", link: "https://en.wikipedia.org/wiki/Pre-trained_model" },
    { term: "Principal Component Analysis (PCA)", definition: "A popular technique for dimensionality reduction.", link: "https://en.wikipedia.org/wiki/Principal_component_analysis" },
    { term: "PyTorch", definition: "An open-source machine learning library based on the Torch library, used for applications such as computer vision and natural language processing.", link: "https://pytorch.org/" },
    { term: "Random Forest", definition: "An ensemble learning method that operates by constructing a multitude of decision trees at training time and outputting the class that is the mode of the classes (classification) or mean prediction (regression) of the individual trees.", link: "https://en.wikipedia.org/wiki/Random_forest" },
    { term: "Recall (or Sensitivity)", definition: "A metric that measures the ability of a model to find all the relevant cases within a dataset. It is the ratio of true positives to the total number of actual positives.", link: "https://en.wikipedia.org/wiki/Precision_and_recall" },
    { term: "Recall (Sensitivity)", definition: "A metric for classification models that measures the proportion of actual positives that were identified correctly. (True Positives / (True Positives + False Negatives)).", link: "https://en.wikipedia.org/wiki/Precision_and_recall" },
    { term: "Recurrent Neural Network (RNN)", definition: "A class of artificial neural networks where connections between nodes form a directed graph along a temporal sequence. This allows it to exhibit temporal dynamic behavior, making it suitable for tasks like language modeling or time series prediction.", link: "https://en.wikipedia.org/wiki/Recurrent_neural_network" },
    { term: "Regression", definition: "A type of supervised learning problem where the goal is to predict a continuous value. For example, predicting the price of a house.", link: "https://en.wikipedia.org/wiki/Regression_analysis" },
    { term: "Regularization", definition: "Techniques used to prevent overfitting in machine learning models. Examples include L1 and L2 regularization, and dropout.", link: "https://en.wikipedia.org/wiki/Regularization_(mathematics)" },
    { term: "Reinforcement Learning", definition: "An area of machine learning concerned with how software agents ought to take actions in an environment in order to maximize some notion of cumulative reward.", link: "https://en.wikipedia.org/wiki/Reinforcement_learning" },
    { term: "ReLU (Rectified Linear Unit)", definition: "A popular activation function. It outputs the input directly if it is positive, otherwise, it outputs zero.", link: "https://en.wikipedia.org/wiki/Rectifier_(neural_networks)" },
    { term: "Semi-Supervised Learning", definition: "A learning paradigm that uses a small amount of labeled data along with a large amount of unlabeled data for training.", link: "https://en.wikipedia.org/wiki/Semi-supervised_learning" },
    { term: "Sentiment Analysis", definition: "The use of natural language processing to identify, extract, quantify, and study affective states and subjective information.", link: "https://en.wikipedia.org/wiki/Sentiment_analysis" },
    { term: "Sigmoid Function", definition: "An activation function that squashes its input into a range between 0 and 1. It's often used for binary classification.", link: "https://en.wikipedia.org/wiki/Sigmoid_function" },
    { term: "Softmax Function", definition: "An activation function that converts a vector of numbers into a probability distribution. It's often used in the output layer of a multi-class classification network.", link: "https://en.wikipedia.org/wiki/Softmax_function" },
    { term: "Stochastic Gradient Descent (SGD)", definition: "A variant of the Gradient Descent algorithm that updates the model's parameters for each training example one by one.", link: "https://en.wikipedia.org/wiki/Stochastic_gradient_descent" },
    { term: "Supervised Learning", definition: "A type of machine learning where the model learns from labeled data. The data consists of input features and corresponding output labels.", link: "https://en.wikipedia.org/wiki/Supervised_learning" },
    { term: "Support Vector Machine (SVM)", definition: "A supervised machine learning algorithm which can be used for both classification or regression challenges.", link: "https://en.wikipedia.org/wiki/Support_vector_machine" },
    { term: "Tensor", definition: "A multi-dimensional array. Tensors are the primary data structure used in deep learning frameworks like TensorFlow and PyTorch.", link: "https://en.wikipedia.org/wiki/Tensor" },
    { term: "TensorFlow", definition: "A free and open-source software library for machine learning and artificial intelligence. It was developed by Google.", link: "https://www.tensorflow.org/" },
    { term: "Test Set", definition: "A subset of the dataset used to assess the performance of the final, trained model. It should not be used during training or validation.", link: "https://en.wikipedia.org/wiki/Training,_validation,_and_test_sets" },
    { term: "Time Series Analysis", definition: "A specific way of analyzing a sequence of data points collected over an interval of time.", link: "https://en.wikipedia.org/wiki/Time_series" },
    { term: "Training Set", definition: "The subset of the dataset used to train the model.", link: "https://en.wikipedia.org/wiki/Training,_validation,_and_test_sets" },
    { term: "Transfer Learning", definition: "A machine learning method where a model developed for a task is reused as the starting point for a model on a second task.", link: "https://en.wikipedia.org/wiki/Transfer_learning" },
    { term: "Transformer", definition: "A deep learning model architecture that relies on the mechanism of self-attention, differentially weighting the significance of each part of the input data. It is the basis for models like BERT and GPT.", link: "https://arxiv.org/abs/1706.03762" },
    { term: "Underfitting", definition: "A modeling error that occurs when a model is too simple to capture the underlying structure of the data. It performs poorly on both the training and test data.", link: "https://en.wikipedia.org/wiki/Overfitting" },
    { term: "Unsupervised Learning", definition: "A type of machine learning where the model learns from unlabeled data, trying to find patterns and structure on its own.", link: "https://en.wikipedia.org/wiki/Unsupervised_learning" },
    { term: "Validation Set", definition: "A subset of the dataset used to tune the model's hyperparameters and evaluate its performance during training.", link: "https://en.wikipedia.org/wiki/Training,_validation,_and_test_sets" },
    { term: "Vanishing Gradient Problem", definition: "A difficulty found in training deep neural networks where the gradients of the loss function approach zero, making it difficult for the network to learn.", link: "https://en.wikipedia.org/wiki/Vanishing_gradient_problem" },
    { term: "Variance", definition: "An error from sensitivity to small fluctuations in the training set. High variance can cause an algorithm to model the random noise in the training data, rather than the intended outputs (overfitting).", link: "https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff" },
    { term: "Weights", definition: "The parameters in a neural network that are adjusted during training to minimize the loss function.", link: "https://en.wikipedia.org/wiki/Synaptic_weight" },
    { term: "Word Embedding", definition: "A learned representation for text where words that have the same meaning have a similar representation. It is a way of representing words as vectors.", link: "https://en.wikipedia.org/wiki/Word_embedding" },
    { term: "Zero-Shot Learning", definition: "A problem setup in machine learning where, at test time, a learner observes samples from classes that were not observed during training and needs to predict the class they belong to.", link: "https://en.wikipedia.org/wiki/Zero-shot_learning" }
].sort((a, b) => a.term.localeCompare(b.term));


const JargonBuster = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredJargon = useMemo(() => {
    if (!searchTerm) {
      return jargon;
    }
    return jargon.filter(item =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-rose-500">The Mega Jargon Buster</CardTitle>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Input
              type="search"
              placeholder="Search jargon..."
              className="w-full sm:w-auto bg-gray-800 border-gray-700 text-white"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              onClick={() => !isExpanded && setIsExpanded(true)}
            />
            <Button onClick={() => setIsExpanded(!isExpanded)} variant="outline" className="bg-rose-500 border-gray-600 ">
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
            <p className="text-gray-400 mb-6 text-center">
                Lost in the sea of acronyms and technical terms? Use the search bar or browse the list.
            </p>
            <div 
                className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rose-500 scrollbar-track-gray-800"
                style={{ 
                    scrollBehavior: 'smooth',
                    overscrollBehavior: 'contain'
                }}
                onWheel={(e) => {
                    e.stopPropagation();
                }}
            >
                {filteredJargon.length > 0 ? (
                    filteredJargon.map((item) => (
                        <div key={item.term} className="border-b border-gray-800 pb-2">
                            <p className="font-bold text-white">{item.term}</p>
                            <p className="text-gray-300 mb-2">{item.definition}</p>
                            <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-rose-500 hover:text-rose-400 text-sm font-medium transition-colors"
                            >
                                LEARN MORE →
                            </a>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center py-4">No matching terms found.</p>
                )}
            </div>
        </CardContent>
      )}
    </Card>
  );
};

export default JargonBuster;
