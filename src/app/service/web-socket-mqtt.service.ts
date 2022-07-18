import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { ActivedSuscription, EnunTopicSuscription, getAllTopics, Topic, Web_Socket } from 'src/app/class/class-directive/interfaceWebSocket';
import { Push } from 'src/app/class/class-directive/push';
import { date1MayorToDate2, fnDateToUnixTime, fnUnixTimeToDate } from 'src/app/util/utilDate';

@Injectable({
  providedIn: 'root'
})
export class WebSocketMqttService {
  idUser?: number;
  nroAnexo?: string;
  /** Url for webSocket */
  idClient?: string;
  suscriptions: ActivedSuscription[] = []
  topicSuscriptions: Topic[] = cloneDeep(getAllTopics());
  variablePrueba = '123456789';
  constructor(
    private _client: MqttService
  ) {
    // console.log('this.idClient .............................................................................................')
    // this.idClient = _client.clientId;
  }

  protected async suscribeTopics(topicSuscription: EnunTopicSuscription[]) {
    this.topicSuscriptions.forEach(topic => {
      topicSuscription.forEach(suscrip => {
        if (topic.active  && topic.topic == suscrip) {//&& !topic.subscription por validar
          console.log(topic.topic)
          switch (topic.topic) {
            case EnunTopicSuscription.RIDE_UPDATE:
              topic.subscription = this._client.observe(topic.topic).subscribe((message: IMqttMessage) => {
                this.onMessageAll(topic.topic!, message);
              });
              break;

            case EnunTopicSuscription.DRIVER_LOCATION:
              topic.subscription = this._client.observe(topic.topic).subscribe((message: IMqttMessage) => {
                this.onMessageAll(topic.topic!, message);
              });
              break;

            case EnunTopicSuscription.USER_LOGGER:
              if (this.idUser! > -1) {
                topic.subscription = this._client.observe(topic.topic).subscribe((message: IMqttMessage) => {
                  this.onMessageAll(topic.topic!, message)
                });
              }
              break;

            case EnunTopicSuscription.DRIVER_OPERATION:
              topic.subscription = this._client.observe(topic.topic).subscribe((message: IMqttMessage) => {
                console.log("DRIVER_OPERATION")
                console.log(message)
                this.onMessageAll(topic.topic!, message);
              });
              console.log(topic.subscription )
              break;

            case EnunTopicSuscription.USER_ANEXO:
              if (this.nroAnexo) {
                console.log(`Topic : ${topic.topic + this.nroAnexo}`)
                topic.subscription = this._client.observe(topic.topic + this.nroAnexo)
                .subscribe((message: IMqttMessage) => {
                  console.log("USER_ANEXO message")
                  console.log(message)
                   this.onMessageAll(topic.topic!, message);
                },
                (error)=>{
                  console.log(error)
                }
                )
                console.log(topic.subscription )
                ;
              }

              break;
              case EnunTopicSuscription.CLIENT_LIST_CORPORATIVE:
                if (this.idClient) {
                  console.log(`Topic : ${topic.topic + this.idClient}`)
                  topic.subscription = this._client.observe(topic.topic + this.idClient)
                  .subscribe((message: IMqttMessage) => {
                    console.log("CLIENT_LIST_CORPORATIVE message")
                    console.log(message)
                     this.onMessageAll(topic.topic!, message);
                  },
                  (error)=>{
                    console.log(error)
                  }
                  )
                  console.log(topic.subscription )
                  ;
                }
  
                break;
              case EnunTopicSuscription.OPERATION_TOPIC:
              topic.subscription = this._client.observe(topic.topic).subscribe((message: IMqttMessage) => {
                this.onMessageAll(topic.topic!, message);
              });
              break;


            case EnunTopicSuscription.NEW_LAST_SERVICE_CALL_ANEXO:
              topic.subscription = this._client.observe(topic.topic).subscribe((message: IMqttMessage) => {
                console.log("NEW_LAST_SERVICE_CALL_ANEXO")
                console.log(message)
                this.onMessageAll(topic.topic!, message);
              });
              break;
          }
        }
      });
    });
    // } else {
    //   this._client.connect(environment.CONFIGURATION.WEB_SOCKET_RABBIT.USER, environment.CONFIGURATION.WEB_SOCKET_RABBIT.PASSWORD, this.onConnect, this.onError);
    // }
  }

  unsuscribeTopic(topic: EnunTopicSuscription) {
    for (let i = 0; i < this.topicSuscriptions.length; i++) {
      if (this.topicSuscriptions[i].subscription && this.topicSuscriptions[i].topic == topic) {
        this.topicSuscriptions[i].subscription?.unsubscribe();
      }
    }
  }

  disconectClient() {
    this._client?.disconnect();
  }

  async suscribeSuscription(suscription: Web_Socket): Promise<ActivedSuscription> {
    this.idClient = await suscription.idClient
     this.nroAnexo = await suscription.nroAnexo
    await this.suscribeTopics(suscription.suscriptions.topic)

    let promisePromise: Promise<ActivedSuscription> = new Promise<ActivedSuscription>(
      (resolve, reject) => {
        try {
          let suscrip: ActivedSuscription = new ActivedSuscription();
          suscrip.id = (fnDateToUnixTime(new Date()) + this.suscriptions.length) * Math.random()
          suscrip.suscriptionWebSocket = suscription;

          this.suscriptions.push(suscrip);

          resolve(suscrip);
        }
        catch (error) {
          reject(error)
        }
      });

    return promisePromise;
  }

  ususcribeSuscription(idSuscription: number) {
    if (this.suscriptions) {
      let indexSuscrip = this.suscriptions.findIndex(suscrip => suscrip.id == idSuscription);
      this.suscriptions[indexSuscrip].suscriptionWebSocket?.suscriptions.topic.forEach(topic => {
        this.unsuscribeTopic(topic);
      });
      this.suscriptions.splice(indexSuscrip, 1);
    }
  };

  private onMessageAll(topic: EnunTopicSuscription, message: IMqttMessage) {
    let dataPush: Push
    if(this.binArrayToJson(message.payload)) {
      dataPush = this.binArrayToJson(message.payload) as Push;
      //  date1MayorToDate2(fnUnixTimeToDate(parseInt(dataPush.expireAt!)), new Date())
      if (true) {
        this.suscriptions.forEach(suscription => {
          console.log("suscription")
          console.log(suscription)
          suscription.suscriptionWebSocket!.suscriptions.topic.forEach(topicSuscription => {
            if (topic == topicSuscription) {
              switch (topic) {
                case EnunTopicSuscription.RIDE_UPDATE:
                  suscription.suscriptionWebSocket?.onMessageRideUpdate!(dataPush);
                  break;

                case EnunTopicSuscription.DRIVER_LOCATION:
                  suscription.suscriptionWebSocket?.onMessageDriverLocation!(dataPush);
                  break;

                case EnunTopicSuscription.USER_LOGGER:
                  suscription.suscriptionWebSocket?.onMessageUserLogger!(dataPush);
                  break;

                case EnunTopicSuscription.DRIVER_OPERATION:
                  suscription.suscriptionWebSocket?.onMessageDriverOperation!(dataPush);
                  break;

                case EnunTopicSuscription.USER_ANEXO:
                  console.log("dataPush")
                  console.log(dataPush)
                  suscription.suscriptionWebSocket?.onMessageUserAnexo!(dataPush);
                  break;

                  case EnunTopicSuscription.CLIENT_LIST_CORPORATIVE:
                    console.log("dataPush")
                    console.log(dataPush)
                    suscription.suscriptionWebSocket?.onMessageClientCorporative!(dataPush);
                    break;
                  
                case EnunTopicSuscription.OPERATION_TOPIC:
                  suscription.suscriptionWebSocket?.onMessageOperationTopic!(dataPush);
                  break;

                case EnunTopicSuscription.NEW_LAST_SERVICE_CALL_ANEXO:
                  suscription.suscriptionWebSocket?.onMessageNewLastServiceCallAnexo!(dataPush);
                  break;
              }
            }
          });
        });
      }
    }



  }

  private binArrayToJson (binArray: Uint8Array): object | undefined{
    var str:string = "";
    for (var i = 0; i < binArray.length; i++) {
      str += String.fromCharCode(binArray[i]);
    }

    return this.tryParseJSONObject(str);
  }
 
  private tryParseJSONObject(jsonString: string):object | undefined{
    try {
      var o = JSON.parse(jsonString);
  
      // Handle non-exception-throwing cases:
      // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
      // but... JSON.parse(null) returns null, and typeof null === "object", 
      // so we must check for that, too. Thankfully, null is falsey, so this suffices:
      if (o && typeof o === "object") {
        // console.log(o)
        return o;
      }
    }
    catch (e) { }
  
    // console.log('tryParseJSONObject stringggggg ', jsonString)
    return undefined;
  }



}


