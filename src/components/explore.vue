<template>
  <div>
    <h2>Jobs Roles and Descriptions</h2>
    <b-container fluid>
    </br>
     <b-row>
       <b-col cols="3">
         <b-list-group v-b-scrollspy:listgroup-ex>
           <b-list-group-item href="#list-item-1">Business Analyst</b-list-group-item>
           <b-list-group-item href="#list-item-2">Data Analyst</b-list-group-item>
           <b-list-group-item href="#list-item-3">Data Scientist</b-list-group-item>
           <b-list-group-item href="#list-item-4">Human Resource</b-list-group-item>
           <b-list-group-item href="#list-item-5">Management Consulting Analyst</b-list-group-item>
           <b-list-group-item href="#list-item-6">Operations Analyst</b-list-group-item>
           <b-list-group-item href="#list-item-7">Software Engineer</b-list-group-item>
         </b-list-group>
       </b-col>
       <b-col cols="9">
         <div id="listgroup-ex" style="position:relative;overflow-y:auto;height:400px">

           <h4 id="list-item-1">Business Analyst</h4>
           <div align='left'>
             A business analyst (BA) is someone who analyzes an organization or business domain (real or hypothetical) and
             documents its business or processes or systems, assessing the business model or its integration with technology.
             There are at least four types of business analysis: </br></br>
              1. Business developer – to identify the organization's business needs and business' opportunities</br>
              2. Business model analysis – to define the organization's policies and market approaches</br>
              3. Process design – to standardize the organization’s workflows</br>
              4. Systems analysis – the interpretation of business rules and requirements for technical systems (generally within IT)</br></br>
              The business analyst, sometimes, is someone who is a part of the business operation and works with Information Technology to improve the quality of the services being delivered, sometimes assisting in Integration and Testing of new solutions. Business Analysts act as a liaison between management and technical developers.
            </br></br>
            Watch A Video: <a href="">A Day In A Life of A Business Analyst</a> </br>
            <strong>Skills Required: CRM, Supplychain Knowledge</strong></br>
              <strong>Majors: Business Analytics, Business Admin with a specialisation in Business Analytics</strong>
              <strong>Companies: Proctor and Gamble, Unilever, DBS</strong>
           </div></br>
           <h4 id="list-item-2">Data Analyst</h4>
           <div align = 'left'>
              Data analysis is a process of inspecting, cleansing, transforming, and modeling data with the goal of discovering useful information, informing conclusions, and supporting decision-making. Data analysis has multiple facets and approaches, encompassing diverse techniques under a variety of names, while being used in different business, science, and social science domains. </br></br>
              Data mining is a particular data analysis technique that focuses on modeling and knowledge discovery for predictive rather than purely descriptive purposes, while business intelligence covers data analysis that relies heavily on aggregation, focusing mainly on business information. In statistical applications, data analysis can be divided into descriptive statistics, exploratory data analysis (EDA), and confirmatory data analysis (CDA). EDA focuses on discovering new features in the data while CDA focuses on confirming or falsifying existing hypotheses. Predictive analytics focuses on application of statistical models for predictive forecasting or classification, while text analytics applies statistical, linguistic, and structural techniques to extract and classify information from textual sources, a species of unstructured data. All of the above are varieties of data analysis.
              Data integration is a precursor to data analysis,[according to whom?] and data analysis is closely linked[how?] to data visualization and data dissemination. The term data analysis is sometimes used as a synonym for data modeling.
            </br></br>
            Watch A Video: <a href="">A Day In A Life of A Data Analyst</a> </br>
              <strong>Skills Required: Statistics, Programming, Data Visualisation</strong></br>
              <strong>Majors: Business Analytics, Business Admin with a specialisation in Business Analytics, Data Science and Analytics</strong>
              <strong>Companies: Singtel, J.P.Morgan, Morgan Stanley, Google, Facebook, LinkedIn</strong>
           </div></br>
           <h4 id="list-item-3">Data Scientist</h4>
           <div align='left'>Data science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from data in various forms, both structured and unstructured, similar to data mining.
              Data science is a "concept to unify statistics, data analysis, machine learning and their related methods" in order to "understand and analyze actual phenomena" with data. It employs techniques and theories drawn from many fields within the context of mathematics, statistics, information science, and computer science.
              </br></br>A data scientist is someone who makes value out of data. Such a person proactively fetches information from various sources and analyzes it for better understanding about how the business performs, and to build AI tools that automate certain processes within the company.
              </br></br>There are many definitions of this job, and it is sometimes mixed with the Big Data engineer occupation. A data scientist or engineer may be X% scientist, Y% software engineer, and Z% hacker, which is why the definition of the job becomes convulted. The actual ratios vary depending on the skills required and type of job. Usually, it’s considered normal to bring people with different sets of skills into the data science team.
              </br></br>Data scientist duties typically include creating various machine learning-based tools or processes within the company, such as recommendation engines or automated lead scoring systems. People within this role should also be able to perform statistical analysis.
            </br></br>
            Watch A Video: <a href="">A Day In A Life of A Data Scientist</a> </br>
            <strong>Skills Required: Statistics, Programming, Data Visualisation, Supervised Learning, Unsupervised Learning, Machine Learning, Deep Learning, Clustering</strong></br>
              <strong>Majors: Business Analytics, Business Admin with a specialisation in Business Analytics, Data Science and Analytics</strong>
              <strong>Companies: Singtel, J.P.Morgan, Morgan Stanley, Google, Facebook</strong>
           </div></br>
           <h4 id="list-item-4">Human Resource</h4>
           <div align='left'>William R. Tracey, in "The Human Resources Glossary," defines Human Resources as: "The people that staff and operate an organization," as contrasted with the financial and material resources of an organization. A human resource is a single person or employee within your organization. Human resources refer to all of the people you employ. </br></br>
             Human Resources is also the organizational function that deals with the people and issues related to people such as compensation and benefits, recruiting and hiring employees, onboarding employees, performance management, training, organization development and culture, and advising senior staff about the impact on people of their financial, planning, and performance decisions on the people in the organization.</div>
           <h4 id="list-item-5">Management Consulting Analyst</h4>
           <div>Some Job Description</div>
           <h4 id="list-item-6">Operations Analyst</h4>
           <div>Some Job Description</div>
           <h4 id="list-item-7">Software Engineer</h4>
           <div>Some Job Description</div>
         </div>
       </b-col>
     </b-row>
   </b-container>
  </div>
</template>

<style>

div {
  position: relative;
}
</style>

<script>

export default {
  data: function() {
    return{

    }

  },

  methods: {

  },

  firebase: {


  }
}

</script>
