import { Layout } from "Layout";
import { useState  } from "react";
import { Section } from "./section/Section";
import { FeedBackOptions } from "./feedBackOptions/feedbackOptions";
import { StatisticsFeedBack } from "./statisticsFeedBack/StatisticsFeedBack";
import { StatisticIsEmpty } from "./emptyStatistics/emptyStatistics";

export const App = () => {

  const [good, setGood] = useState(() => JSON.parse(window.localStorage.getItem('good')) ?? 0);
  const [neutral, setNeutral] = useState(() => JSON.parse(window.localStorage.getItem('neutral')) ?? 0);
  const [bad, setBad] = useState(() => JSON.parse(window.localStorage.getItem('bad')) ?? 0);
  
  const handleOptionsChange = (options) => {
    switch (options) { 
      case 'good':
        setGood(prev => {
          const newWalue = prev + 1
          window.localStorage.setItem('good',JSON.stringify(newWalue))
          return newWalue
        })
        break;
      
      case 'neutral':
      setNeutral(prev => {
          const newWalue = prev + 1
          window.localStorage.setItem('neutral',JSON.stringify(newWalue))
          return newWalue
        })
        break;
      
      case 'bad':
        setBad(prev => {
          const newWalue = prev + 1
          window.localStorage.setItem('bad',JSON.stringify(newWalue))
          return newWalue
        });
        break;
      
      default:
       return ; 
    }

  }

  
  const countTotalFeedback = () => good + neutral + bad;

  const hasFeedBack = good + neutral + bad > 0;
  
  const countPositiveFeedbackPercentage = () => {

    const total = countTotalFeedback()

    if (total === 0) {
      return 0;
    }
    return Math.round((good / total) * 100)
  }


  return (
    <Layout>
      <Section title="Give Feedback">
              <FeedBackOptions
            options={["good","neutral","bad"]}
            onLeaveFeedback={handleOptionsChange}
          />
        </Section>
        
        <Section title='Statistics'>
          {hasFeedBack ? (
            <StatisticsFeedBack
          good={good} neutral={neutral} bad={bad}
          totalFeedback={countTotalFeedback()}
          calcPositiveFeedback={countPositiveFeedbackPercentage()}
            />)
            : <StatisticIsEmpty message='There is no feedback' />
        }
            
      </Section>
    </Layout>
  );
};



