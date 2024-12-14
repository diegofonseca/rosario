<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Cabeçalho -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-900">Santo Terço</h1>
        <p class="text-gray-600 mt-2">{{ currentTitle }}</p>
      </div>

      <!-- Cartão principal -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <!-- Texto da oração -->
        <div class="mb-8">
          <p class="text-lg text-gray-800 leading-relaxed">
            {{ currentPrayerText }}
          </p>
          <p v-if="showAveMariasCount" class="mt-4 text-blue-600 font-medium text-center">
            Rezar 10 vezes
          </p>
        </div>

        <!-- Progresso -->
        <div class="mb-8">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progresso</span>
            <span>{{ progress }}%</span>
          </div>
          <div class="h-2 bg-blue-100 rounded-full">
            <div 
              class="h-full bg-blue-600 rounded-full transition-all duration-300"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>

        <!-- Botões -->
        <div class="flex justify-between">
          <button
            @click="startPrayer"
            class="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Iniciar
          </button>
          <button
            v-if="!isFinished"
            @click="nextPrayer"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Próximo
          </button>
          <button
            v-else
            @click="startPrayer"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Rezar Novamente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Pray',
  setup() {
    const router = useRouter()
    const currentStep = ref(0)
    const currentMysteryIndex = ref(0)
    const currentAveMaria = ref(0)

    const mysteries = {
      gozosos: [
        'No primeiro mistério, contemplamos a anunciação do Anjo a Nossa Senhora.',
        'No segundo mistério, contemplamos a visitação de Nossa Senhora a sua prima Isabel.',
        'No terceiro mistério, contemplamos o nascimento de Jesus em Belém.',
        'No quarto mistério, contemplamos a apresentação do menino Jesus no templo.',
        'No quinto mistério, contemplamos a perda e o encontro do menino Jesus no templo.'
      ],
      dolorosos: [
        'No primeiro mistério, contemplamos a agonia de Jesus no Horto.',
        'No segundo mistério, contemplamos a flagelação de Jesus Cristo.',
        'No terceiro mistério, contemplamos a coroação de espinhos.',
        'No quarto mistério, contemplamos Jesus carregando a cruz para o Calvário.',
        'No quinto mistério, contemplamos a crucificação e morte de Jesus.'
      ],
      gloriosos: [
        'No primeiro mistério, contemplamos a ressurreição de Jesus Cristo.',
        'No segundo mistério, contemplamos a ascensão de Jesus ao céu.',
        'No terceiro mistério, contemplamos a vinda do Espírito Santo.',
        'No quarto mistério, contemplamos a assunção de Nossa Senhora.',
        'No quinto mistério, contemplamos a coroação de Nossa Senhora.'
      ],
      luminosos: [
        'No primeiro mistério, contemplamos o batismo de Jesus no Jordão.',
        'No segundo mistério, contemplamos o primeiro milagre de Jesus em Caná.',
        'No terceiro mistério, contemplamos o anúncio do Reino de Deus.',
        'No quarto mistério, contemplamos a transfiguração de Jesus.',
        'No quinto mistério, contemplamos a instituição da Eucaristia.'
      ]
    }

    const mysteryNames = {
      gozosos: 'Mistérios Gozosos',
      dolorosos: 'Mistérios Dolorosos',
      gloriosos: 'Mistérios Gloriosos',
      luminosos: 'Mistérios Luminosos'
    }

    const prayers = {
      initial: 'Divino Jesus, nós vos oferecemos este terço que vamos rezar, contemplando os mistérios da nossa redenção. Concedei-nos, por intercessão de Maria, vossa Mãe Santíssima, a quem nos dirigimos, as virtudes que nos são necessárias para rezá-lo bem e a graça de ganhar as indulgências desta santa devoção.',
      paiNosso: 'Pai Nosso que estais nos céus, santificado seja o vosso nome. Venha a nós o vosso reino, seja feita a vossa vontade assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido, e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
      aveMaria: 'Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora de nossa morte. Amém.',
      gloria: 'Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.',
      oMeuBomJesus: 'Ó meu bom Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente as que mais precisarem.',
      salveRainha: 'Salve, Rainha, Mãe de misericórdia, vida, doçura, esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei, e depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria.',
      creio: 'Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo; na Santa Igreja Católica; na comunhão dos santos; na remissão dos pecados; na ressurreição da carne; na vida eterna. Amém.'
    }

    const getCurrentMysteryType = () => {
      const date = new Date()
      const day = date.getDay()
      
      switch(day) {
        case 0: // Domingo
        case 3: // Quarta
          return 'gloriosos'
        case 1: // Segunda
        case 6: // Sábado
          return 'gozosos'
        case 2: // Terça
        case 5: // Sexta
          return 'dolorosos'
        case 4: // Quinta
          return 'luminosos'
        default:
          return 'gozosos'
      }
    }

    const currentMysteryType = ref(getCurrentMysteryType())

    const currentTitle = computed(() => {
      if (currentStep.value === 0) return 'Oração Inicial'
      if (currentStep.value === 1) return 'Creio'
      if (currentStep.value === 2) return 'Pai Nosso e Ave Marias Iniciais'
      if (currentStep.value >= 3) {
        const mysteryIndex = Math.floor((currentStep.value - 3) / 12)
        if (mysteryIndex < 5) {
          return `${mysteryNames[currentMysteryType.value]} - ${mysteryIndex + 1}º Mistério`
        } else {
          return 'Salve Rainha'
        }
      }
      return ''
    })

    const showAveMariasCount = computed(() => {
      if (currentStep.value === 2) return false // Não mostrar "10 vezes" nas Ave-Marias iniciais
      
      const mysteryStep = (currentStep.value - 3) % 12
      return mysteryStep === 2
    })

    const isFinished = computed(() => {
      return currentStep.value >= 63 // Total de passos do rosário
    })

    const currentPrayerText = computed(() => {
      if (currentStep.value === 0) return prayers.initial
      if (currentStep.value === 1) return prayers.creio
      if (currentStep.value === 2) {
        if (currentAveMaria.value === 0) return prayers.paiNosso
        if (currentAveMaria.value === 1) return 'Primeira Ave-Maria pela virtude da Fé\n\n' + prayers.aveMaria
        if (currentAveMaria.value === 2) return 'Segunda Ave-Maria pela virtude da Esperança\n\n' + prayers.aveMaria
        if (currentAveMaria.value === 3) return 'Terceira Ave-Maria pela virtude da Caridade\n\n' + prayers.aveMaria
        if (currentAveMaria.value === 4) return prayers.gloria
        return ''
      }
      
      const mysteryStep = (currentStep.value - 3) % 12
      const mysteryIndex = Math.floor((currentStep.value - 3) / 12)
      
      if (mysteryIndex < 5) {
        if (mysteryStep === 0) return mysteries[currentMysteryType.value][mysteryIndex]
        if (mysteryStep === 1) return prayers.paiNosso
        if (mysteryStep === 2) return prayers.aveMaria
        if (mysteryStep === 11) return prayers.gloria
        if (mysteryStep === 3) return prayers.oMeuBomJesus
        return ''
      } else {
        return prayers.salveRainha
      }
    })

    const progress = computed(() => {
      if (isFinished.value) return 100
      const total = 63 // Total steps in the rosary
      return Math.round((currentStep.value / total) * 100)
    })

    const nextPrayer = () => {
      if (isFinished.value) {
        router.push('/') // Voltar para home quando terminar
        return
      }
      
      if (currentStep.value === 2) {
        if (currentAveMaria.value < 4) {
          currentAveMaria.value++
        } else {
          currentStep.value++
          currentAveMaria.value = 0
        }
      } else {
        const mysteryStep = (currentStep.value - 3) % 12
        if (mysteryStep === 2) {
          // Quando estiver nas Ave-Marias, pular direto para o próximo mistério
          currentStep.value = currentStep.value + 9
        } else {
          currentStep.value++
        }
      }
    }

    const startPrayer = () => {
      currentStep.value = 0
      currentMysteryIndex.value = 0
      currentAveMaria.value = 0
      currentMysteryType.value = getCurrentMysteryType()
    }

    return {
      currentStep,
      currentTitle,
      currentPrayerText,
      progress,
      nextPrayer,
      startPrayer,
      showAveMariasCount,
      isFinished
    }
  }
}
</script>
