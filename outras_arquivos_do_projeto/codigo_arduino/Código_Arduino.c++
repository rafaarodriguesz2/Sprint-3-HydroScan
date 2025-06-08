/* incluindo a biblioteca */
#include "Ultrasonic.h"

/* criando uma variavel informando qual porta será responsave pela 
"entrada e saida" do ultrassom do sensor */
const int PINO_TRIGGER = 12;
const int PINO_ECHO = 13;
// float labelMax = 220.0; // Variável global para labelMax
// float labelMin = 200.0; // Variável global para labelMin

/* informando a biblioteca os parametros 
necessarios para seu funcionamento */
HC_SR04 sensor (PINO_TRIGGER, PINO_ECHO);

/* Definindo a variavel da altura da represa*/
const float ALTURA_TOTAL_REPRESA = 200.0;

/* iniciando uma ação */
void setup() {
  /* definindo velicidade comunicação pela entrada USB */
  Serial.begin(9600);
}

/* iniciando outra ação com loop (fica refazendo ação pelo delay definido) */
void loop() {
  /* Capturando a distância do sensor */
  float distancia = sensor.distance();

  /* Invertendo o valor medido pelo sensor para fazer sentido com a regra de negocio*/
  float nivel_agua = ALTURA_TOTAL_REPRESA - distancia;

  /* Limitando a distância max para caso de bugs, não imprima um valor negativo */
  if (nivel_agua < 0) {
    nivel_agua = 0;
  }
  
  /* Capturando os dados para o Serial Plotter */
  Serial.println(nivel_agua);
  /* o \t separa os gráficos*/
  // Serial.print(labelMax);
  /* o \t separa os gráficos*/
  // Serial.print("\t");
  // Serial.println(labelMin);
  

  /* definindo o delay do loop */
  delay(1000);
}