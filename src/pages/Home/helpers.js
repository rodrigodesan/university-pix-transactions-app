export const questionsOptions = [
  {
    value: 'question1',
    text: 'Qual o estado com a maior média de valores enviados por quantidade de transações para um determinado ano?',
  },
  {
    value: 'question2',
    text: 'Qual o estado com a menor média de valores enviados por quantidade de transações para um determinado ano?',
  },
  {
    value: 'question3',
    text: 'Qual a região com a maior média de pix recebidos para um determinado ano?',
  },
  {
    value: 'question4',
    text: 'Qual a quantidade de pix realizados por região para um determinado ano?',
  },
  {
    value: 'question5',
    text: 'Quais os 10 municípios com mais número de transações por pessoas físicas em uma determinada faixa de tempo?',
  },
  {
    value: 'question6',
    text: 'Quais municípios tiveram média superior a determinado valor em envios realizados por pessoas jurídicas em todo o período?',
  },
  {
    value: 'question7',
    text: 'Quais as 10 cidades que tiveram maior diferença negativa (valor maior saindo que entrando) de pix para um determinado ano?',
  },
  {
    value: 'question8',
    text: 'Quais as 10 cidades que tiveram maior diferença positiva (valor maior entrando que saindo) de pix para um determinado ano?',
  },
  {
    value: 'question9',
    text: 'Para determinado estado, em qual mês de determinado ano ocorreu o maior volume de transações, incluindo transações enviadas e recebidas por pessoas físicas e jurídicas?',
  },
  {
    value: 'question10',
    text: 'Qual cidade, estado, ano e mês em que ocorreu o maior pico de transações para determinada região?',
  },
];

export const questionsParams = {
  question1: ['startYear', 'endYear'],
  question2: ['startYear', 'endYear'],
  question3: ['startYear', 'endYear'],
  question4: ['startYear', 'endYear'],
  question5: ['year', 'selectedMonths'],
  question6: ['minAvg'],
  question7: ['startYear', 'endYear'],
  question8: ['startYear', 'endYear'],
  question9: ['startYear', 'endYear', 'state'],
  question10: ['region'],
};
