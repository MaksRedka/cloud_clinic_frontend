<template>
  <v-sheet class="fill-height"
           style="background: linear-gradient(rgb(212,231,253), rgb(252,219,245)) center center / cover no-repeat">
    <v-responsive class="align-center text-center fill-height">

      <h1 class="text-h2 font-weight-bold">Шукайте лікарів онлайн</h1>
      <div class="text-sm-h5 font-weight-medium mb-n1 mt-5">Записуйтесь на прийом не виходячи з дому</div>

      <div class="py-6"/>
      <v-row class="d-flex justify-center align-center">
        <v-col class="d-flex w-100 align-center justify-center">
          <v-responsive max-width="550">
            <v-autocomplete
              label="Введіть пізвище або спеціальність"
              variant="solo"
              :items="['Iван Іванович(Лор)', 'Петро Петрович(Окуліст)', 'Сергій Сергійович(Педіатр)']"
            >

            </v-autocomplete>

          </v-responsive>
          <v-btn
            class="mb-5 ml-5"
            variant="elevated"
            color="primary"
          >Записатися
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-sheet>
</template>

<script lang="ts" setup>

</script>
