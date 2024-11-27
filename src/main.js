import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Importando estilos do Tailwind
import './style.css'

// Store
const store = createStore({
  state() {
    return {
      currentMystery: 0,
      currentPrayer: 0,
      prayerMode: 'terco', // 'terco' ou 'rosario'
      prayers: {
        creedoPt: 'Creio em Deus Pai Todo-Poderoso, Criador do Céu e da Terra. E em Jesus Cristo, seu único Filho, Nosso Senhor, que foi concebido pelo poder do Espírito Santo. Nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado. Desceu à mansão dos mortos, ressuscitou ao terceiro dia. Subiu ao Céu, está sentado à direita de Deus Pai Todo-Poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos Santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.',
        paiNosso: 'Pai Nosso que estais no Céu, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade assim na Terra como no Céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido, e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
        aveMaria: 'Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte. Amém.',
        gloria: 'Glória ao Pai e ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.',
        salveRainha: 'Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei, e depois deste desterro mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus. Para que sejamos dignos das promessas de Cristo. Amém.',
        oracaoFatima: 'Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o Céu e socorrei principalmente as que mais precisarem.',
        oferecimento: 'Divino Jesus, eu Vos ofereço este terço que vou rezar, contemplando os mistérios da nossa Redenção. Concedei-me, pela intercessão de Maria, vossa Mãe Santíssima, as virtudes que me são necessárias para bem rezá-lo e a graça de ganhá-lo nas indulgências desta santa devoção.'
      },
      mysteries: [
        {
          name: 'Mistérios Gozosos',
          days: ['Segunda-feira', 'Sábado'],
          mysteries: [
            'A Anunciação do Anjo a Nossa Senhora',
            'A Visitação de Nossa Senhora a sua prima Isabel',
            'O Nascimento de Jesus',
            'A Apresentação do Menino Jesus no Templo',
            'O Encontro do Menino Jesus no Templo'
          ]
        },
        {
          name: 'Mistérios Dolorosos',
          days: ['Terça-feira', 'Sexta-feira'],
          mysteries: [
            'A Agonia de Jesus no Horto',
            'A Flagelação de Jesus',
            'A Coroação de Espinhos',
            'Jesus carrega a Cruz',
            'A Crucificação e Morte de Jesus'
          ]
        },
        {
          name: 'Mistérios Gloriosos',
          days: ['Quarta-feira', 'Domingo'],
          mysteries: [
            'A Ressurreição de Jesus',
            'A Ascensão de Jesus ao Céu',
            'A Vinda do Espírito Santo',
            'A Assunção de Nossa Senhora',
            'A Coroação de Nossa Senhora'
          ]
        },
        {
          name: 'Mistérios Luminosos',
          days: ['Quinta-feira'],
          mysteries: [
            'O Batismo de Jesus no Jordão',
            'As Bodas de Caná',
            'O Anúncio do Reino de Deus',
            'A Transfiguração de Jesus',
            'A Instituição da Eucaristia'
          ]
        }
      ]
    }
  },
  mutations: {
    nextPrayer(state) {
      const maxPrayers = state.prayerMode === 'terco' ? 50 : 200
      if (state.currentPrayer < maxPrayers) {
        state.currentPrayer++
      }
    },
    resetPrayer(state) {
      state.currentPrayer = 0
    },
    setPrayer(state, value) {
      state.currentPrayer = value
    },
    setPrayerMode(state, mode) {
      state.prayerMode = mode
      state.currentPrayer = 0
    }
  }
})

// Router
const router = createRouter({
  history: createWebHistory('/rosario-app/'),
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/rezar',
      component: () => import('./views/Pray.vue')
    }
  ]
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
