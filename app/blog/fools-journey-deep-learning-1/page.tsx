"use client"

import React from 'react'
import Image from 'next/image'
import { BlogPostLayout, CodeBlock } from '@/components/ui/blog-post-layout'

const FoolsJourneyPost = () => {
  const post = {
    title: "A Fool\'s Journey into Deep Learning: Part 1",
    date: 'July 2, 2025',
    readTime: 15,
    tags: ['Deep Learning', 'AI', 'Machine Learning', 'Neural Networks', 'Personal Journey'],
    author: 'Sabittwa Banerjee'
  }

  const mnistCode = `
import torch
import torch.nn as nn
from torchvision import datasets, transforms

# Define a simple neural network
class SimpleNet(nn.Module):
    def __init__(self):
        super(SimpleNet, self).__init__()
        self.fc1 = nn.Linear(28 * 28, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = x.view(-1, 28 * 28)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Load the MNIST dataset
transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))])
trainset = datasets.MNIST('~/.pytorch/MNIST_data/', download=True, train=True, transform=transform)
trainloader = torch.utils.data.DataLoader(trainset, batch_size=64, shuffle=True)

# Instantiate the model, loss function, and optimizer
model = SimpleNet()
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)

# Training loop (simplified)
for images, labels in trainloader:
    optimizer.zero_grad()
    output = model(images)
    loss = criterion(output, labels)
    loss.backward()
    optimizer.step()

print("Training finished!")
`

  return (
    <BlogPostLayout post={post}>
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Embarking on the path of deep learning can feel like stepping into a new world, full of complex jargon, mathematical mysteries, and endless possibilities. It&apos;s a journey that mirrors the classic Tarot archetype of The Fool: taking a leap of faith into the unknown, armed with little more than curiosity and a desire to learn. This post chronicles my own &quot;Fool&apos;s Journey&quot; into the depths of neural networks, from initial confusion to the first glimmers of understanding.
          </p>
        </section>

        {/* The First Step: Hello World of DL */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">The First Step: The &quot;Hello, World!&quot; of Deep Learning</h2>
          <p className="text-gray-300 mb-4">
            Every programming journey begins with a &quot;Hello, World!&quot;. In deep learning, the equivalent is often classifying handwritten digits from the MNIST dataset. It&apos;s a simple task, but it introduces fundamental concepts like neural networks, tensors, and training loops.
          </p>
          <CodeBlock
            code={mnistCode}
            language="python"
            filename="mnist_example.py"
          />
        </section>

        {/* The Wilderness of Hyperparameters */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">The Wilderness of Hyperparameters</h2>
          <p className="text-gray-300 mb-4">
            After the initial success, I wandered into the &quot;Wilderness of Hyperparameters.&quot; Learning rate, batch size, number of layers, activation functions... the choices seemed endless. Like The Fool encountering new characters who offer conflicting advice, I found countless articles and papers suggesting different approaches.
          </p>
          <p className="text-gray-300 mb-4">
            There&apos;s no magic formula. The key, I learned, is experimentation and intuition, guided by a solid understanding of what each hyperparameter does. Tools like TensorBoard became my trusted companions, helping me visualize the impact of my choices.
          </p>
        </section>

        {/* The Tower Moment: Overfitting */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">The Tower Moment: Encountering Overfitting</h2>
          <p className="text-gray-300 mb-4">
            My &quot;Tower moment&quot; came when I built a model that achieved 99% accuracy on my training data, but performed poorly on data it had never seen before. This is the classic problem of overfitting. My model had memorized the training examples instead of learning the underlying patterns.
          </p>
          <div className="my-6">
            <Image
              src="/SabittwaGhibli.png" 
              alt="A diagram showing overfitting"
              width={800}
              height={400}
              className="rounded-lg mx-auto"
            />
            <p className="text-center text-sm text-gray-500 mt-2">A visual representation of a model that is too complex for the data.</p>
          </div>
          <p className="text-gray-300 mb-4">
            This was a moment of crisis and revelation. I had to tear down my assumptions and learn about regularization techniques like Dropout and L2 regularization, which are designed to prevent overfitting and help models generalize better.
          </p>
        </section>

        {/* The Star: Finding the Right Architecture */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">The Star: Finding the Right Architecture</h2>
          <p className="text-gray-300 mb-4">
            After the setback of overfitting, I found hope in exploring different neural network architectures. I learned about Convolutional Neural Networks (CNNs) for image data and Recurrent Neural Networks (RNNs) for sequential data. It was like looking up at the stars and seeing a map of the possibilities.
          </p>
          <p className="text-gray-300 mb-4">
            This is where the journey becomes more creative. Choosing and designing an architecture is as much an art as a science. It&apos;s about understanding the structure of your data and matching it with a network that can effectively learn from it.
          </p>
        </section>

        {/* The World: A Never-Ending Journey */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">The World: A Never-Ending Journey</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Reaching &quot;The World&quot; in this journey doesn&apos;t mean I&apos;ve mastered everything. On the contrary, it&apos;s a realization that this field is constantly evolving. The journey of learning is cyclical. With every new project, I feel like The Fool again, stepping into a new domain with fresh eyes and renewed curiosity. And that, I&apos;ve come to believe, is the most exciting part of the adventure.
          </p>
        </section>
      </div>
    </BlogPostLayout>
  )
}

export default FoolsJourneyPost
