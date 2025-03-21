# Milestone 1

### Problematic

The goal of our project is to explore the world of programming languages through data visualization. 

We would like to gather a collection of interesting and atypical visualization to learn more about programming languages.

The kind of visualization we would like to do are the following: 
- Trends in programming languages (popularity of languages over time, study of rise and fall in popularity). 
- Being able to explore informations about programming languages history (creators, country of creation). 
- Graph of similarity between languages, inheritance relationship between languages.
- Performances comparisons between languages. 
- Being able to link programmer profiles and their used languages (based on their level of experience in programming, their work...)

The target audience includes aspiring programmers, experienced developers, tech educators, and anyone curious about the dynamic landscape of programming languages.

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

A preliminary EDA using the Kaggle Programming Language Database dataset can be found in the jupyter notebook [EDA.ipynb](/Milestones/milestone1/EDA.ipynb).

### Related work

#### What has already been done in programming language data visualization?

Famous projects that are close to what we would like to do are the annual stsck overflow surveys https://survey.stackoverflow.co/2024/technology which are showing programming languages trends among the stackoverflow users. 

Other programming languages visualizations are listed below:

TIOBE index: https://www.tiobe.com/tiobe-index/

Github: https://github.com/niklas-heer/speed-comparison

IEEE Spectrum: https://spectrum.ieee.org/top-10-programming-languages


#### Why is our approach original?

Our goal is to stand out from the project listed above by making visualization that are atypical and have not been done before. We would also like to stand out by selecting visualizations that are normally not put together in one single web page.
Finally, we would like to stand out from the projecst above by putting the emphasis on making interactive, fluid, artistically orginal and visually pleasing visualizations. 

#### What are our source of inspiration?

The stack overflow surveys have been an important inspiration by showing us that it is possible to show interesting insights about programming languages in a visually pleasing way.

We have been inspired by the [Bolo museum](https://en.wikipedia.org/wiki/Mus%C3%A9e_Bolo) at EPFL. What we would like to do is to have a similar approach: we would like to make it fun to learn about technology. Make the learning experience interactive and accessible for people with any level of tech expertise.
