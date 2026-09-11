# QR Codes — Festival Gabiroba

O site já identifica quando uma espécie foi aberta por QR Code usando o parâmetro `?origem=qrcode`.
Quando o visitante escaneia um código, a espécie é registrada na página **Minha trilha**.

## Gerar os 20 QR Codes

Com o domínio definitivo publicado, rode:

```bash
python3 scripts/generate_qrcodes.py https://SEU-DOMINIO.com
```

Exemplo de URL gerada para o Cambuci:

```text
https://SEU-DOMINIO.com/especies/cambuci?origem=qrcode
```

Os arquivos são criados em:

```text
public/qrcodes/
```

Também é criado `public/qrcodes/qrcodes.json`, com a relação entre planta, URL e arquivo do QR Code.

## Antes de imprimir

1. Publique o site no domínio definitivo.
2. Gere novamente os QR Codes usando esse domínio.
3. Teste pelo menos um QR Code de cada lote em um celular fora da rede local.
4. Depois disso, use os PNGs finais nas placas das mudas.

Não use os QR Codes de demonstração com `localhost` nas placas do evento.
