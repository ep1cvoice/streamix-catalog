export const movies = [
  {
    id: 1,
    title: 'Начало',
    year: 2010,
    rating: 8.8,
    genre: 'Sci-Fi',
    type: 'movie',
    poster: 'https://picsum.photos/seed/inception2010/300/450',
    hero: 'https://picsum.photos/seed/inception2010wide/1400/800',
    description:
      'Профессиональный вор, крадущий секреты из глубин подсознания, получает задание, которое может оказаться невозможным — внедрить идею в чужой разум.',
  },
  {
    id: 2,
    title: 'Тёмный рыцарь',
    year: 2008,
    rating: 9.0,
    genre: 'Боевик',
    type: 'movie',
    poster: 'https://picsum.photos/seed/darkknight2008/300/450',
    hero: 'https://picsum.photos/seed/darkknight2008wide/1400/800',
    description:
      'Бэтмен принимает вызов харизматичного преступника Джокера, ввергающего Готэм-сити в хаос и заставляющего героя переступить черту между добром и злом.',
  },
  {
    id: 3,
    title: 'Интерстеллар',
    year: 2014,
    rating: 8.6,
    genre: 'Sci-Fi',
    type: 'movie',
    poster: 'https://picsum.photos/seed/interstellar2014/300/450',
    hero: 'https://picsum.photos/seed/interstellar2014wide/1400/800',
    description:
      'Команда исследователей отправляется сквозь червоточину в поисках нового дома для человечества, пока Земля умирает.',
  },
  {
    id: 4,
    title: 'Дюна',
    year: 2021,
    rating: 8.0,
    genre: 'Фэнтези',
    type: 'movie',
    poster: 'https://picsum.photos/seed/dune2021/300/450',
    hero: 'https://picsum.photos/seed/dune2021wide/1400/800',
    description:
      'Пол Атрейдес прибывает на самую опасную планету во вселенной — пустыню Арракис, хранящую единственный в галактике источник ценнейшего вещества.',
  },
]

export const series = [
  {
    id: 5,
    title: 'Во все тяжкие',
    year: 2008,
    rating: 9.5,
    genre: 'Драма',
    type: 'series',
    poster: 'https://picsum.photos/seed/breakingbad2008/300/450',
    hero: 'https://picsum.photos/seed/breakingbad2008wide/1400/800',
    description:
      'Учитель химии, узнав о неизлечимой болезни, начинает варить метамфетамин вместе с бывшим учеником, постепенно превращаясь в опасного преступника.',
  },
  {
    id: 6,
    title: 'Чернобыль',
    year: 2019,
    rating: 9.4,
    genre: 'Историческая',
    type: 'series',
    poster: 'https://picsum.photos/seed/chernobyl2019/300/450',
    hero: 'https://picsum.photos/seed/chernobyl2019wide/1400/800',
    description:
      'Трагическая история ядерной катастрофы 1986 года и людей, которые рисковали всем ради её устранения, пока советская система скрывала правду.',
  },
  {
    id: 7,
    title: 'Игра престолов',
    year: 2011,
    rating: 9.2,
    genre: 'Фэнтези',
    type: 'series',
    poster: 'https://picsum.photos/seed/got2011/300/450',
    hero: 'https://picsum.photos/seed/got2011wide/1400/800',
    description:
      'Благородные семьи ведут беспощадную борьбу за контроль над Железным троном Семи королевств Вестероса.',
  },
  {
    id: 8,
    title: 'Мандалорец',
    year: 2019,
    rating: 8.7,
    genre: 'Sci-Fi',
    type: 'series',
    poster: 'https://picsum.photos/seed/mandalorian2019/300/450',
    hero: 'https://picsum.photos/seed/mandalorian2019wide/1400/800',
    description:
      'Одинокий воин-охотник за головами путешествует по далёкому краю галактики, взяв под защиту маленькое существо, разыскиваемое тёмными силами.',
  },
]

export const allContent = [...movies, ...series]
