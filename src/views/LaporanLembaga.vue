<template>
  <CRow>
    <CCol sm="12" md="6" lg="5">
      <card-list-data
        title="Laporan Lembaga"
        :items="items"
        :fields="fieldsLembaga"
        routeEndpoint="laporan-lembaga"
        :isLoading="isLoading"
      ></card-list-data>
    </CCol>
    <toast-msg :listToasts="listToasts" />
  </CRow>
</template>

<script>
import CardListData from '../components/CardListData.vue'
import ToastMsg from '../components/ToastMsg'
import { LaporanService } from '../services/laporan.service'
import { fieldsLembaga } from './fields'

export default {
  name: 'LaporanLembaga',
  components: { CardListData, ToastMsg },
  data() {
    return {
      items: [],
      fieldsLembaga,
      listToasts: [],
      isLoading: false,
    }
  },
  methods: {
    async getDataLembaga() {
      this.isLoading = true
      try {
        const dataLembaga = await LaporanService.getLembagaData()

        this.items = dataLembaga.map(item => {
          item.Record.jumlah_anggaran = parseInt(
            item.Record.jumlah_anggaran
          ).toLocaleString('id', {
            style: 'currency',
            currency: 'IDR',
          })
          return {
            key: item.Key,
            ...item.Record,
          }
        })
      } catch (err) {
        this.listToasts.push({
          message: 'Terjadi masalah. Data lembaga tidak berhasil didapatkan.',
          color: 'danger',
        })
      }
      this.isLoading = false
    },
  },
  async mounted() {
    await this.getDataLembaga()
  },
}
</script>

<style></style>
