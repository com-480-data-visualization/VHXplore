# Milestone 1

### Problematic

As contemporary students, we engage with programming languages almost every day. They have become such an integral part of our academic and professional lives that we often take them for granted, rarely pausing to reflect on their origins, evolution, and impact. Our team was inspired by the idea of looking at programming languages from a fresh perspective—one that goes beyond syntax and functionality to explore their histories, rise and fall in popularity, and the philosophies that shaped them.
The primary goal of this project is to uncover intriguing insights about programming languages through engaging and interactive visualizations. We aim to explore key aspects such as historical development, industry trends, performance comparisons, and the unique stories behind various languages. By illustrating their evolution and interconnectedness, we hope to bring a new level of appreciation to the tools we use daily.
With these visualizations, we want to make complex data accessible and visually compelling, offering fresh insights for developers, students, educators, and tech enthusiasts alike. Beyond just presenting statistics, we seek to foster a sense of connection with programming languages—helping users not only understand their historical significance but also feel more inspired and engaged when using them in the future.
Our project aspires to bridge the gap between technical communities and the broader public, transforming abstract trends into an interactive and informative experience. The target audience includes aspiring programmers, experienced developers, tech educators, and anyone curious about the dynamic landscape of programming languages.

### Dataset

To create a comprehensive visualization of programming language trends and characteristics, we selected three publicly available datasets, each offering unique perspectives.

#### 1. Kaggle Programming Language Database

https://www.kaggle.com/datasets/sujaykapadnis/programming-language-database
This dataset provides structured data on 4,000+ programming languages, each with over 350 attributes, including:

- General Info: Year of appearance, inventor, country.
- Usage Stats: Number of users, job postings, related books and papers.
- Technical Features: Boolean indicators (e.g. Case Insensitive Identifiers，For Loops).
- Conceptual Links: Relations between languages (sourced from Wikipedia).

Limitations：
While detailed and well-organized, some entries have missing fields, which may lead to visualization gaps if not preprocessed carefully.

#### 2. Stack Overflow Annual Developer Survey

https://survey.stackoverflow.co/
This annual survey gathers responses from 65,000+ developers worldwide, capturing:

- Demographics: Age, education, country.
- Employment: Job roles, experience, industry.
- Language Use: Language preferences and prior experience.
- Tech Attitudes: Opinions on AI and emerging technologies.

Limitations：
As a self-reported survey, it may reflect sampling bias. It also contains fewer quantitative features compared to the other datasets, limiting its statistical use.

#### 3. PYPL PopularitY of Programming Language

https://pypl.github.io/PYPL.html
PYPL is a monthly time-series dataset showing language popularity trends since 2004, based on Google search frequency.

Limitations：
The data is well-structured and ready to use, but it focuses only on popularity metrics and lacks deeper metadata like demographics or language features.

Together, these three datasets complement each other’s weaknesses, forming a well-rounded foundation for a complete programming language data visualization.

### Exploratory Data Analysis

### Related work

What others have already done with the data?
Why is your approach original?
What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).
In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.
What others have done:
Several existing projects have visualized programming language popularity, often using data from GitHub, Stack Overflow, or TIOBE Index. These projects typically focus on ranking languages or tracking their growth over time. For example, some visualizations present static bar charts showing annual popularity changes or simple line charts for trend analysis. While these provide useful insights, they often lack interactivity and deeper exploration of factors like cultural influences or performance comparisons.

TIOBE index: https://www.tiobe.com/tiobe-index/
Stack Overflow: https://survey.stackoverflow.co/2024/technology
Github: https://github.com/niklas-heer/speed-comparison
IEEE Spectrum: https://spectrum.ieee.org/top-10-programming-languages

- Originality of the approach

originality comes from:
centralizing different visualization about programming languages even atypical ones. This has never been done

do it with a fluid and interactive interface

This project aims to go beyond simple rankings by creating a more comprehensive narrative. It will combine historical timelines, performance benchmarks and [something] in one interactive experience. Additionally, visual elements like language similarity graphs and geographic maps will provide unique perspectives, making the data more relatable and engaging. The inclusion of cultural insights — such as the meaning behind language names and logo designs — adds another layer of storytelling rarely seen in existing projects.

- Sources of inspiration

Bole museum / stack overflow surveys /pretty visualization inspired by the lecture
Inspiration comes from diverse sources, including data journalism websites like The Pudding and FiveThirtyEight, which excel at making data stories accessible and captivating. Visualizations in National Geographic and Scientific American have also influenced the use of layered storytelling through graphics. For interactive elements, tools like ObservableHQ and examples from D3.js's community gallery inspired the use of custom charts and playful animations to keep the audience engaged.
