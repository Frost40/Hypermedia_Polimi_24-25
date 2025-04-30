<template>
  <div class="faq-page">
    <h1 class="faq-title">FAQ</h1>

    <div class="faq-section">
      <h2 class="section-title">Yoga</h2>
      <div class="faq-list">
        <FaqItem
            question="What should I wear to class?"
            answer="We recommend wearing comfortable, stretchy clothing that allows for a full range of motion. A t-shirt or tank top and leggings or comfortable pants are ideal. You can also wear socks if you prefer, although many students practice barefoot."
            :iconOnRight="true" />
        <FaqItem
            question="How early should I arrive for my yoga class?"
            answer="Please arrive at least 10 minutes before the scheduled start time of your class. This will give you enough time to settle in, place your belongings, and even begin a gentle warm-up if you wish."
            :iconOnRight="true" />
        <FaqItem
            question="Do I need to bring my own yoga mat?"
            answer="No, you don't need to bring your own mat. We provide all necessary equipment, including yoga mats, blocks, straps, and blankets, at the studio."
            :iconOnRight="true" />
        <FaqItem
            question="Do I need to remove my shoes before entering the studio?"
            answer="Yes, please remove your shoes before entering the yoga studio. This helps us maintain a clean and hygienic environment for everyone."
            :iconOnRight="true" />
        <FaqItem
            question="I'm a complete beginner. Do you offer classes suitable for my level?"
            answer="Absolutely! We welcome students of all levels, including complete beginners. We offer specific 'Beginner' or 'Level 1' classes that focus on the foundational poses, proper alignment, and basic breathing techniques. Our instructors are experienced in guiding beginners and will provide modifications to suit your individual needs and abilities. Feel free to check our class schedule for beginner-friendly options."
            :iconOnRight="true" />
      </div>
    </div>

    <div class="faq-section">
      <h2 class="section-title">Mediation</h2>
      <div class="faq-list">
        <FaqItem
            question="What will I learn in a typical mediation course?"
            answer="In a mediation course, you will generally learn the fundamental principles and techniques of mediation. This includes understanding conflict dynamics, developing effective communication and active listening skills, learning the different stages of the mediation process, and gaining insights into ethical considerations."/>
        <FaqItem
            question="Who is a mediation course suitable for?"
            answer="Mediation courses are typically suitable for a wide range of individuals. This can include professionals looking to enhance their negotiation and conflict resolution skills, individuals interested in pursuing a career in mediation, and anyone who wants to improve their ability to manage disagreements constructively in their personal or professional life."/>
        <FaqItem
            question="What can I expect from the structure of a mediation course?"
            answer="You can generally expect a mediation course to involve a combination of theoretical learning and practical exercises. This might include lectures, group discussions, role-playing scenarios, and opportunities to practice mediation techniques in a supportive environment."/>
        <FaqItem
            question="Will I receive any form of recognition after completing a mediation course?"
            answer="Upon completion of a mediation course, participants typically receive a certificate of attendance or completion. This document acknowledges your participation and the skills you have gained. The specific recognition and its implications may vary depending on the course provider and any relevant regulatory bodies."/>
        <FaqItem
            question="What are the potential benefits of taking a mediation course?"
            answer="Taking a mediation course can offer numerous benefits. It can help you develop valuable skills in communication, problem-solving, and conflict resolution. These skills can be applied in various personal and professional contexts, leading to improved relationships, more effective negotiations, and the ability to facilitate peaceful resolutions to disputes."/>
      </div>
    </div>

    <div class="faq-section">
      <h2 class="section-title">Workshop</h2>
      <div class="faq-list">
        <FaqItem
            question="What can I achieve by participating in a workshop?"
            answer="By participating in our workshops, you can typically expect to gain a deeper understanding of the topic, learn practical techniques and strategies, and have the opportunity to interact with instructors and other participants. Many workshops also provide resources and materials to support your learning after the event."
            :iconOnRight="true" />
        <FaqItem
            question="What is the typical format of a workshop at your center?"
            answer="The format of our workshops can vary depending on the topic, but they often involve a mix of presentations, interactive activities, group discussions, and hands-on exercises. Our goal is to create an engaging and dynamic learning environment that encourages active participation."
            :iconOnRight="true" />
        <FaqItem
            question="What is the general purpose of attending a workshop at your center?"
            answer="Our workshops are designed to provide participants with focused learning experiences on specific topics. They aim to equip you with practical skills, knowledge, and insights that you can apply in your personal or professional life."
            :iconOnRight="true" />
        <FaqItem
            question="Who typically benefits from attending your center's workshops?"
            answer="Our workshops are generally beneficial for anyone interested in learning more about the specific topic being addressed. This could include individuals looking to develop new skills, professionals seeking to enhance their expertise, or anyone with a general curiosity about the subject matter."
            :iconOnRight="true" />
        <FaqItem
            question="Will I receive any form of acknowledgment for attending a workshop?"
            answer="Yes, participants who complete a workshop at our center typically receive a certificate of attendance or completion. This serves as a record of your participation in the learning experience."
            :iconOnRight="true" />
      </div>
    </div>

    <div class="faq-section">
      <h2 class="section-title">Seminars</h2>
      <div class="faq-list">
        <FaqItem
            question="What should I bring with me to the seminar?"
            answer="Comfortable clothing that allows for movement is recommended. For yoga-based seminars, please bring your own yoga mat. Other specific items, such as blankets or walking shoes for the nature meditation, will be mentioned in the individual seminar details."/>
        <FaqItem
            question="Do I need prior experience to attend these seminars?"
            answer="Not necessarily. Our seminars cater to various levels, including beginners. While some basic body awareness might be helpful for certain seminars, the descriptions will specify any recommended experience. Introductory seminars like 'Mindfulness for Everyday Life' are open to everyone."/>
        <FaqItem
            question="What is the duration of each seminar?"
            answer="The length of each seminar varies depending on the subject matter. Most seminars typically range between 2 and 4 hours. Please refer to the specific details provided for each seminar on our website for the exact duration and schedule."/>
        <FaqItem
            question="I have specific physical limitations/injuries. Can I still participate?"
            answer="We encourage you to contact us before booking to discuss any specific limitations or injuries. Our experienced instructors, mentioned in the seminar descriptions, can often provide modifications to accommodate individual needs and ensure safe participation."/>
        <FaqItem
            question="What are the benefits of attending seminars compared to regular classes?"
            answer="Seminars offer a more focused and in-depth exploration of specific yoga and meditation topics. With longer durations, they allow for deeper theoretical understanding, extended practice sessions, and opportunities for more detailed interaction with the instructors."/>
      </div>
    </div>
  </div>
</template>

<script setup>
  import FaqItem from '~/components/FaqItem.vue';
</script>

<style scoped>
  .faq-page {
    background-color: #BCC7C2;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
    color: #3D5144;
    box-sizing: border-box;
    padding: 0;
  }

  @media (min-width: 1440px) {
    .faq-page {
      max-width: 1440px;
      margin-left: auto;
      margin-right: auto;
      padding: 0;
    }
  }

  .faq-title {
    text-align: center;
    font-size: 2rem;
    padding: 5rem 2rem;
    margin-top: 0rem;
    background-color: #3D5144;
    color: #BCC7C2;
  }

  .faq-section {
    margin-bottom: 2.5rem;
  }

  .faq-section:nth-of-type(2) .section-title,
  .faq-section:nth-of-type(4) .section-title {
    justify-content: flex-end;
    text-align: right;
    padding-left: revert;
    padding-right: 2.5rem;
  }

  /* Removing default divider */
  .faq-section:nth-of-type(2) .section-title::after,
  .faq-section:nth-of-type(4) .section-title::after {
    content: none;
  }

  /* Adding a divider on the left side for titles aligned on the right */
  .faq-section:nth-of-type(2) .section-title::before,
  .faq-section:nth-of-type(4) .section-title::before {
    content: "";
    flex-grow: 1;
    height: 2px;
    background: #3D5144;
    margin-right: 1rem;
  }

  .faq-section:nth-of-type(2),
  .faq-section:nth-of-type(4) {
    text-align: right;
  }

  .faq-section:nth-of-type(2) .faq-list,
  .faq-section:nth-of-type(4) .faq-list {
    align-items: flex-end;
  }

  .section-title {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    font-style: italic;
    font-weight: bold;
    padding-bottom: 0.5rem;
    padding-left: 2.5rem;
    display: flex;
    align-items: center;
  }

  .section-title::after {
    content: "";
    flex-grow: 1;
    height: 2px;
    background: #3D5144;
    margin-left: 1rem;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>