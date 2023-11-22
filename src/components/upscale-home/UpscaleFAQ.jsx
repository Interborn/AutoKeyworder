import React, { useState } from 'react'

const UpscaleFAQ = () => {
    
  const [activeIndex, setActiveIndex] = useState(null);
  
  const FAQs = [
    {
      question: 'lorem ipsen lorem ipsen',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatem earum suscipit ipsam quae voluptate aut, cupiditate temporibus placeat voluptatum mollitia incidunt fugit, architecto saepe possimus reiciendis tempora ullam maiores.',
    },
    {
      question: 'lorem ipsen lorem ipsen',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatem earum suscipit ipsam quae voluptate aut, cupiditate temporibus placeat voluptatum mollitia incidunt fugit, architecto saepe possimus reiciendis tempora ullam maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatem earum suscipit ipsam quae voluptate aut, cupiditate temporibus placeat voluptatum mollitia incidunt fugit, architecto saepe possimus reiciendis tempora ullam maiores.',
    },
    {
      question: 'lorem ipsen lorem ipsen',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatem earum suscipit ipsam quae voluptate aut, cupiditate temporibus placeat voluptatum mollitia incidunt fugit, architecto saepe possimus reiciendis tempora ullam maiores.',
    },
    {
      question: 'lorem ipsen lorem ipsen',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatem earum suscipit ipsam quae voluptate aut, cupiditate temporibus placeat voluptatum mollitia incidunt fugit, architecto saepe possimus reiciendis tempora ullam maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatem earum suscipit ipsam quae voluptate aut, cupiditate temporibus placeat voluptatum mollitia incidunt fugit, architecto saepe possimus reiciendis tempora ullam maiores.',
    },
    {
      question: 'lorem ipsen lorem ipsen',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatem earum suscipit ipsam quae voluptate aut, cupiditate temporibus placeat voluptatum mollitia incidunt fugit, architecto saepe possimus reiciendis tempora ullam maiores.',
    },
    {
      question: 'lorem ipsen lorem ipsen',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatem earum suscipit ipsam quae voluptate aut, cupiditate temporibus placeat voluptatum mollitia incidunt fugit, architecto saepe possimus reiciendis tempora ullam maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatem earum suscipit ipsam quae voluptate aut, cupiditate temporibus placeat voluptatum mollitia incidunt fugit, architecto saepe possimus reiciendis tempora ullam maiores.',
    },
    {
      question: 'lorem ipsen lorem ipsen',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatem earum suscipit ipsam quae voluptate aut, cupiditate temporibus placeat voluptatum mollitia incidunt fugit, architecto saepe possimus reiciendis tempora ullam maiores.',
    },
    {
      question: 'lorem ipsen lorem ipsen',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatem earum suscipit ipsam quae voluptate aut, cupiditate temporibus placeat voluptatum mollitia incidunt fugit, architecto saepe possimus reiciendis tempora ullam maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatem earum suscipit ipsam quae voluptate aut, cupiditate temporibus placeat voluptatum mollitia incidunt fugit, architecto saepe possimus reiciendis tempora ullam maiores.',
    },
  ];

  return (
    <div id="upscaleHome_faqs" className="flex flex-col items-center bg-stone-950 gap-10 py-10 px-4">
        <div id="upscaleHome_faqs-questionsAndAnswers" className="flex flex-col items-center w-full gap-14">
            <div id="upscaleHome_faqs-questionsAndAnswers_header" className="flex flex-col items-center w-full gap-6">
            <h3 className="font-bold text-[44px] text-white"><span className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 text-transparent bg-clip-text">Frequently Asked Questions (FAQs)</span></h3>
            <p className="text-[18px] text-white max-w-[77ch] text-center">Here, we have listed some of the commonly asked questions from the community. If you do not find the information you need, feel free to reach out to us at support@pixelbin.io</p>
            </div>
            <div class="flex flex-col w-full max-w-[1250px]">
            {FAQs.map((faq, index) => (
                <button 
                class="group border-b-8 border-stone-950 bg-indigo-300 focus:outline-none rounded-t-md"
                onClick={() => setActiveIndex(index === activeIndex ? null : index)}
                >
                <div class="flex items-center justify-between h-12 px-3 font-semibold hover:bg-indigo-400">
                    <span class="truncate">{faq.question}</span>
                    <svg 
                    class={`h-4 w-4 transition-transform duration-300 ${index === activeIndex ? 'rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    >
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class={`max-h-0 overflow-hidden duration-300 group-focus:max-h-[200px] bg-stone-950 text-stone-200 ${index === activeIndex ? 'max-h-[200px]' : ''}`}>
                    <p class="flex items-center p-4 text-start text-sm cursor-default">{faq.answer}</p>
                </div>
                </button>
            ))}
            </div>
        </div>
    </div>
  )
}

export default UpscaleFAQ
