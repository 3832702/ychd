const banners = ['../../static/image/bg1.jpg']


const routes1 = [
  {
    title: '申请开店',
    is_pass: null,
    path: "/pages/management/index",
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAABuElEQVRoge2Z322DMBCHf1QM0A3KBs0IdJLycu/ZoOzhl3SSpiOwQUfIAJboQ7koCRhsfEct5E+KFCXR3X3y+R8p+r6HJpboBOAAoC6NuWjledIKDFwl3gG8AjhbometXGoiNxKMqoyKyINEB+BzeK8mIy4yIVGXxjRQlhEVcUhcAEBbRkxkToLRlBER8ZFgtGSiRUIkGA2ZKJE1Eoy0zGqRGAlGUmaViIQEIyUTLCIpwUjIBIloSDCxMt4imhJMjIyXyBYSzFqZYuk+EiJhiSoAjUe9zKk05ic2L7AgEhrMEtUAvpwBx7yVxpwl8jtbS6Cdvh2vzjdASJuVUx8KbXa1I3aNgFErjWksEXB/0xzVMxoRS3TERhPbl4mROT7+Zqq1bofu3yWYQcbJ7PKbioQPqk9RtmQ3IpOrlgSWqHV8VWnkUxMB8KEYe0Rurclgf8eNQjKmL7sZkSySGiJzZMU95L4IY9rYGqQme4W45baNLUBjH+kA+JzRKgAvUkk1RI5ztz5m2PnFNs3dTPYskhpZJDWySGpkkdTIIqkxe9YantP6cIgpIiCPk6VDY8hfBDFE59lNa/0CukMNplZqS2kAAAAASUVORK5CYII="
  },
  /*{
    title: '个人设置',
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAAFRUlEQVRogd2a3XHiSBDHf97SO2QAGZgMkCNYLgK4Ks/zQQbeCMw96+EgAuMIFmcAGYgMjudVle9heqyWPB8Iy96q+1epKGk+unump7+Gm9fXV/pEZcwQWAPzQJctsMyK4t8+6WZ9TibYA7eR9jkwkac3fOtzssqYGU0hVsCdPCv1/Vb69oa+d0Sv8h9ZUezU+74ypgSeVF/d/iH0uiMaLSGC33qjl+pQGTMBHoDv8umIPax7T/dcfl8iU74AU9W3TS/HGgunos/AQ1YUhxif0R0RIfbUQiAEflbGLGNjr4HM+ZPmOfuOVcuocQgKooQYyKcTzZV+rIzZqP4zYCyvZYSmaxu7A18ZM5S5HlW/F6GJ8BAV5sbnRzxCbLOiWEhbjj2kWkCAkZpilRXF2kdQVl0z3B5/BmZOdUXAuWrLfWoW2pEHnxAAQmCCPSuOAc3ENiSEYIN1imfP+CMw0edPaG/ldSC8vUNoR9zHU1YUY9/Algc/CYHdpR5bxs9k3IiExxfTPQLIiuKm3Z6yWmWoQQgu5OkMGb+R5xKUNNW3gZBqObWZypn4rRAepvJ69PUJCaJN664yZtwfW90gtLUj9Zp9ryBy2FxsNMAKM+yRv4sgNLWFXAUccfiMZEWxFjM8xzqoNR3PgzDibP/hitBde/ioNfRarRYzJRFr4ek/xm7/jPeH84Rd4XVWFOUFcyWtp0OXoPGU6iDO7gD8hd/CjKTtcGGIk6TpkIq19Ko+JPpusB7b6fMR+EGdj/ygtjgDWiFOAI7mKJW/vKmWdHT6nMvvGCvIGRhHnJUOO87AIhSyC50NzQMcCmeGWP8xwO5OKU17+T04Oje/7u+HpNPTRpjSIjbGqtOASCzUGqNjuTM2LCkDfTeE83+wu5x/o2kZHF7k2WLNcEyfl9Sru0gJASB9FvI6iM0vC7gSXhxfGrfA+ubX/b02W+30NAll1Y5ZUXQqKFTGHISRpFXyjJ1Rp82Nw766QoghtTG4Jo11Y0ZdHa7w+lbQ0IIkVcIDvQP7K8brMdeUh954/rTiw1dDC/KhFSFQTEhAj/mQRmhBHrsWzcSvOO97TcHNjTl1jcOE17eUOcOaNWennypjoDZxJdbpxFLXHTbsuK2MmV1qMFpVyeAYMQIL7OqP5fO01W37DWvD28nKVJ456VBiTZ1/b1JlG2FuQp0ZnmWO2PyPwovjS+MILP8/IUosjG85nT+zothE+m5ohhJHrMo4ojn2TOgoIhj6yJwL4B95jTrrLvlI0vvKzjxQr3YIZ2wZNKZSnWh38SPBCoaDMDYB/safS5ykbZISok0z5fmj5SBRFzfZNtxTTWij2CWw7CHVdRZ1RCLVDqpW6wAfseF5V0Y+BFmIPfW5ChqGUKUxx1bFIZEvfDZa+Q7Ana+SEjojWurZ7xIC3lRVRw3eHQkJ4rbyJVRH+koIDy7a8GayqdrvONTw1UXsGC8Q3pFn+R35whPR2z21AxxhHVdZGbNJmUqZs5QxzirOsZc57xhuWc/ndjvE70dc/DRv3Uzl2MPntvhE82ZpTsRMijWc07wocuNvsTWvvCWEvuh58M0bM7+60uEIljSDNn2TNcOq2oh41cUxdsKq0s7DMNgzMaZ5iRSs0AQ9uwzIad4saSFWrZusHep+MDSvait17KSqJQ7TS4WARIiihNF6ecTa8ktCjE6QOe9ophXPXFArS96zywSXZn97/DmDhmvbB+jtuSLt/rTigy9t7vv/Jxp9/xdFb/9TZcxKfZvQvJa+ptgQRDIf6QpVPYyhc1Uyhc9QrZx4yL/lutJRFP8BU6iIyvb0KlIAAAAASUVORK5CYII="
  }*/
]

/**
 * @module 用户信息
 */
const routes = [
  /*{
    title: '我的收藏',
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAADkklEQVRoge2av2sUQRTHP5FBBJGks5DoWYqKWwviBRULFQ2WFrnCB2IVO38UxkIQFIxiRJjCiFob0UK7E/+ARBC0vCCxEwwqGh2NxbzLnZq93dy9DSfcF47dnX0z731vvvNjZ6ZvcXGRLASRMjAKHM00tsVjYNx5X80y7MsiEkRGges2cbWNM8778VYGLYkEkWPAI32cBcaAWp5/qBOoAkrqb4smDzvvp9LyZBGpaUGvgLLz/qNNqPkQRAaAKrALmHXel9Js17QopEzj36isNgkA9VnRxy0a07JIJQLUM80672dMImsD6ntWH8tpdq2I1FEziKdT1LIM8hD5L9Aj0m3oEek2FE4kiAzowFYoCiUSRPYQu845vS8MRdfIfWA9sFbvC0NhRILIYWAT8AWYAzZpWiEoskZuAX3AeeBCU1ohcFYFBZETwAHifGgD0A98dt7f1vcTxFr5AHwizmpfO++vWfg3qZEg8gR4AIwAG4lt4g1/TvIS4C2wTm1GgKuat2NY1UhJr8+BU8772j+OYtpOgCBSAm4CR5rydgSrNnIO+EqU1tkc9meBQ8B34LRFACZEnPdPgYNAAE4GkYdptkHkDnBSbfc7719axGDWa2lA+4EF4r+dhuPADwxJgHH3q4H9An5m+AyWJMCw+wUIIgmxV6rpc4lGm7miDf49sC2IJJaf0KZEgN1a5lwQeQbsJRIDGAkiL4ij/A5gO9C1RLbqdZ+W/Rm4p2nHiR3CN31OgNROYaWwnqJMAO+I86t7wKDzvuK8rwCDmrYAzAOXLR2b1oi2gc0p75rXqMzR+0LsNvSIdBt6RLoNq7EcVAkilaL9WI/sS9C1rHHil+DSPmRR+yyF1IhOHqsoCcUIUNV35jAnojKqErfLAG7oD02rFiE1y1WUP6REnE9V6huYQaQKTBJXV+5aS81qFeVvKb0CkuZdWL1P9B0YS61jIstJyXmfpK2kOO8TCpBa20R0lX0SuEuUyzxxL3w0K6/aDGueutQmO1m1b4tIHillwVpqKyaiRzqmySGlLKRIbVp9rAi5iaiUpmicS5kHhvJIKQtaxpCWCXA9iEytRGq5iGh1z9A4HfQCKFmeSdGySlo26msmr9TyjCMJUUp1XHLej+UPMT90TCkHkTHgIvEIyTSNmkpFqxqp6bVfr3UpjbUbaF6oj2ap1WOoLWcP2aeDZoABoqxW/WCNtpFJoio+asewLH4DWSpiD6ee0r0AAAAASUVORK5CYII="
  },
  {
    title: '我的关注',
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAAD0UlEQVRoge2Y33HaQBDGfzB6N6nAdGBSgUkFoQOLGfQcOgiuIPj5HowrCO5AriBQQVAH8GxmlIdbWafjJIR0+N/km2GQTqfd/W73TrvbSdOUz4DuWxvgC/+JvDcEdSbto2gADIC+9SgGVoFS2zZG7KOoJ/KH1qONyF8dk9Ep2+z7KOoDM2AEXByR8wgsA6UWxxRaOkKR//3I1B2wBGaBUhvXhAMisjoz4McpRgnWwDRQKq6atI+iITAHrhrouEMTKkRBgYiE0BK4tIxboF0cW3MHuFf0NlBqVkJiBvy0hh9FbyGMhPAACCmSToCROfeFiBgWk4dRrdWVd/toL94Yww+BUqE1b2HPoSJcrHeHFL24A4YZmU6aplk4xcakAyPqQJQtyRfjRY5FYode0biBDlPOGk1mmxGZk++JRiQMRbZnx/J/L/+FlWyoY0FO5i5Qatp5nkz6wF8ZTAKl+k0VGIpMMjsZzq5bkRD5PWBFvpe/dNGbNcO0jYIMYuhMbi/IvTNrS0Lkbw35AKFJJAmUWrZVYiibA0/G0JOM+ZK/IPf2qAtcy03sS4mBsOTaF2L5vzZzrY1vLXKs3qK/K97lo/eJ1nUG4QWUfRh949NkvyaR3ptZ4QFd9NcRisfwR0Fm87pLvvMvJcX4SMhSqriLTsQyeDvnXwlrdOY8z3KtBXnuUpqCv2eY2e+GPJX41iQzPQarZI6pKJMlzIfAFqsWcsGsR0bAbxn3ktwZRg3QYXvteFyIgH0UTdF5lF1eJ+j6yJlG2RXiFPglt74yVTutd2GNXv05xcLLhbGrN1D4IEpS9yC3F0AsYdcGc3ISCTpl+YauUxIZv0KTNQuvW+CrzDOTz7nLJmcXpawKO5WBeONPRsKudRyVaUbiIBKs4u/AK84URSrEzDNXNPeM+c5BbMvihNZwWc2yMK779sPSXMtBZiMr3BRxiZ4VOowA1hU1y6ZKeGXSaJHJ9swpZEzls4p5c/R+CSvmmNXrgcdKO40mHB2Q2qfZPopi8mO3tLGxj6JexTclJG9eOPsKtdL4lp4ZkZekN7IoLh11SGTyDlC7HmlKRgwcUoOMDQeJcVkknFRYtSCz4kQyJSRK3zm5QnwNMqeSgIalbgmZYY33jpJpQgJqnlplaKrUkX89oI/XURN50JKIGBU2Ue4gk5C3QHdAeErDsDURMSrEDxlomHV7aQeJ0WNj6F7IHXvP3jONSwdvfS0PZBJa1D9eQsuEI8zOUjbb8N5pdHgm9K3DhbO0TC0yr9P4S9P0bL/nyWRwTvnmz/seeSt8ym78h8anIfIPQ66eO9gURt4AAAAASUVORK5CYII="
  },*/
  {
    title: '我的店铺',
    path: "/pages/stores/details/details",
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAABuElEQVRoge2Z322DMBCHf1QM0A3KBs0IdJLycu/ZoOzhl3SSpiOwQUfIAJboQ7koCRhsfEct5E+KFCXR3X3y+R8p+r6HJpboBOAAoC6NuWjledIKDFwl3gG8AjhbometXGoiNxKMqoyKyINEB+BzeK8mIy4yIVGXxjRQlhEVcUhcAEBbRkxkToLRlBER8ZFgtGSiRUIkGA2ZKJE1Eoy0zGqRGAlGUmaViIQEIyUTLCIpwUjIBIloSDCxMt4imhJMjIyXyBYSzFqZYuk+EiJhiSoAjUe9zKk05ic2L7AgEhrMEtUAvpwBx7yVxpwl8jtbS6Cdvh2vzjdASJuVUx8KbXa1I3aNgFErjWksEXB/0xzVMxoRS3TERhPbl4mROT7+Zqq1bofu3yWYQcbJ7PKbioQPqk9RtmQ3IpOrlgSWqHV8VWnkUxMB8KEYe0Rurclgf8eNQjKmL7sZkSySGiJzZMU95L4IY9rYGqQme4W45baNLUBjH+kA+JzRKgAvUkk1RI5ztz5m2PnFNs3dTPYskhpZJDWySGpkkdTIIqkxe9YantP6cIgpIiCPk6VDY8hfBDFE59lNa/0CukMNplZqS2kAAAAASUVORK5CYII="
  }
]

/**
 * @module 管理设置
 */
const setUp = [
  {
    title: '商品发布',
    path: "/pages/release/index",
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAACWklEQVRoge2avWsUQRiHnztHsFA8tFUR4h8g2PmBoI1FBDkLW5s3haVYqEWKgJrK0uZtBLEQNCCGlDaRdIFgraAkrSFiwIAja7Fj9rJuLnOXmZ09uafZ2dvZvd/D7OzXTCvLMkYVKzINdIEVkzrMsDiJaeAAQDttnOEoSfwG5kZOpEJixqjO/HNqWZEOcBe4ApyImOmrUb08yA67SQC0eju7FXkO3AIOBQq7F2+N6g2fiv0kAIyr1AE+Aid79t0EvoVKXMEP4LZPxb0kwIkAcxQS34GHRvVZiLT7xUcCwFiRSeCiW18HJozqRm1J++ArAfnl9wlwENgCro6iBOQip135k1FdiZ7Qg0ElYOcNcTliNm+GkYC8sx+OnM2bksRPYNZHAoqrVnIqJO4NcuVsxCPKfiWgASIhJCCxSCgJSCgSUgISiYSWgAQiMSSgZpFYElDjfSSEhHvdmAcmy8+EtbRIwJZYBC645Q6iiwQ+nY6UlttEFYnZJ8pEE6lTAiKJ1C0BEURSSEBgESsyRQIJCN8iXRJIQPgb4iO3fGFUXwY+dl+CihjVReBayGP6kvzFKhRjkaYxFmkaY5GmMRZpGv+VyGbqECFoA9aVj6cM4snfjGvlDb0i52uLMwRW5A7FWM778vY28MaVj1mR13UFGwT3PeuxW90CnpbrtIH75EPSANebJmNFzgKfgaPup1dVA7atLMuwIpeABYqmWweWiDthwIdzwBmKmRirRvVUVcXtKRxO5h2FeZP4BXwAursNn5fnonSAWeAm+dtjysHSDff/X4AHRnW+X+U/V6kVINdSZk8AAAAASUVORK5CYII="
  },
  {
    title: '商品列表',
    path: "/pages/release-list/index",
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAABqElEQVRoge2ZwW3CQBQFx5bvoYOkBHcAVEA6CAfvGUpwBzHnvaQEUkFcAukg6QDOWHIOgBRboCjxvi/H8pywhMZ62sX7/ImOWZYCW+CesGwS79eBnTeJ0YQAWFXOmQZRhLjwKHQ3SBoX3kddhZVzM+Ctq+e3xNY3VJH8/JUwVM6lQA5MBPqtWRCgAKYi99Rya+2E7oPZiiTeryvntiL9znJrkXhfqtyDeWqNQfrGGKRvDCaIZUWZAKlI/2FdUZ5E7oPl1lKUxQt3liuSo+tbzYpyfinqytXfQeL9DmFxbK9I6De7fWDfTWJgI/QXQneDqK5rKudyYBbQuwcKZdttE9V1bXUvKcM62c+DtJAzKPutdcyyAliJ/HOrMDG6EABmI9P2OTIP4EyB5/NnZS1p0B6Zll2FlXNdFX/CssYvOfUtxdD81fLxu0Q3+V9YBlEN5wDeLSeNBcLuNZiTfQzSN8YgfWMM0jcsK8oDp9Ndgek/VgWwUMktt5Z0NGS5ImvgReS2G2In3u+BUub/flE5929nQzHwKfSXQneDmNMYSBFmk3ifC7xX+QIn7V+jxCaylwAAAABJRU5ErkJggg=="
  },
  {
    title: '商家微信',
    path: "/pages/qr-code/index",
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAABt0lEQVRoge1ZwXHCMBBcZ/RPSnAJdGBTSXhYdcTUcR86idKBS3AJ5I1nnAcecmiMQfiEPDfelzBiVwvn4+6c9X0PDchOVVUK8h0NUcMvdNbyb2pviGr23geAjYSwAfAtQTTgB0AZsH8jpf8mQbIEqDFivNdbQ+RCCDprawBfIochygJ0S7CwVPuLxMCWrdtYItGNhIbq0zqxBTprHXt5MESHGDqvCK2CrV0sETU3+2pkaViNLA1qjLwi/T4Mr3cJgm9kNxRjIQjdHwW+kc8kpxBA6tBqcF1UPg2Dc3sqheb+FiZOdIRQ2WIMUSlBlBp60u/Qqo7hYIha4NLOiqOzNgewk+AyuN1vO/x3dCI9+QhyKW49oYXbWevI1lKZrR3REOHOtMx+1YRWdqqqWojrkuU4vIzn+FRlRtZy/nRmKmsFk2N8buXz8wPkM/Q5j57Q4kXjLwJrJZwfC7zLHWcyg01qcSNNaN01DN+Ke/sexZT+PS01obUaWRpWI0uDGiOphw9X8J6l+Jh8Hr8oI5jxn7SGlhBaAPsnPuf8C0mNDGV/LcLF1sWcIXJqrPdIAPg94GKJqBk+/AHUN3TsLOjUDQAAAABJRU5ErkJggg=="
  },
  {
    title: '店铺编辑',
    path: "/pages/management/index",
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAAEJUlEQVRogdWaT2gVRxzHPwnTalMPQQRthaZQoRQURJGCFhSFHkJzqQcLMQjCgFQPKiIo1qog4h8wBxHprzd7sIeUgtWLUAJWELSgCGpvCkYRQaI+TchbSA/z27y8zdvdmd33XuIXwjCb2czvu5+Z2ZnfpmNycpKyiqztBv4AVgHzgApwEvjViIyW7sBDHU0y8gJY1OBXFeAusMuI3CndUYZKG4ms3Qec1uoYcBP4DFgKzNfrE8Br4KQROVOqwxR1NuFvHNByHFhrRDYakWXAV8AQ8A74EEfsdGTt/Sb0OUOliCRo3DAi32S0OwAs1EvXjMi3hTtuoLJEftZyHNia1kiH0ybglV5aU7LfGSpsRJ/yAq3+a0QeZbXXyV7V6pui/aapDJFDWmbSiKXG45Xt7xL9NlQhI5G1/cBHWs2loYoXhQngSJF+s1SUyHHcShRCI57otzyNB8mE3hBZ+x3wiVZ9aRzWMtV4ZO1hYE9oPEAH0BdsBDhHGI1+3LYFUoxH1n4O/ESBB6u6GjS0CtLIHYb6dwZwy/No4M9zoDf0CUyncSinbZBxI3IJuBQYz5S8iUTWbsDtnwAeG5Fhj9uCjJdRyNC6gBvD48COvMZK41OtPvc0XlheRnQy9mh1xDOoM8AHuPfGriLBhciXyG+4LXkE7M5rHFm7kprxZ0bkr2Lh+SvXiNJYrdURz6DO4Yy3hQb4EYlpVPEIKmG8LTQgx0giqKeeQcXGAU4VDy1MeUTioLyGiBr/WqsVI3K+VHQBSjWiQcUHIN8hEi/RAEfLhRamrDf7BdzLzJdGN7Beqy/Tkgz6gP4BPg6KNF1vgeUNjWhQ67TqS2OQ2tw4kdHuHrWTZTPUDdxJIzKonYXQ2KzVVBqqXuAyUD6hpt0DAzOMJIIKoRE/5YtZDY3IddxTbKoaTfYiNLZodZwWHGN9VGekII0j1ObG7+3K9SaVJBJEQzWgZQWPfVirNGUkQWPMh0YiqTA0WzSgnsheajQOet4fp3hmlQbUG9mp5ZjP1qJBimfWaIAaSQTlSyPO+04A25scV7BiIlNDxJPGj7jtC7Qo4RaqzgQN343efgJyW+1QJ/U0cr8mFcxttVyG2svMl0ZuplGX8ovAirIBeuieEekzuMnaBdzOuyNB40FK+rMbeAgsbl6smeqJrH0Smo0fxNGoUktM10mX4WFqH3VarSrwp3fKVFM8caYx8/xuRH7Q9k3f5TbQqBFJPY/UadqY9z6/t/q7elI+ea1+YARYrpfaluIJUSoRpXAd+BKX+gR4DGxofVjhSjuzH8N9PYpPfRXgrBFpOMHnguqMaIZjGFiC+8pUBf4D+ubKiy9N041c0Xq8h3oH7DEiv7Q9qgKabqRLywg3N76f7a15iAz1Zl4C2+biqpSnTtycGMX9J88X76MJgP8B0V6EcbWQ7QAAAAAASUVORK5CYII="
  },
  /*{
    title: '竞拍广告',
    path: "/pages/bidding/index",
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAAEJUlEQVRogdWaT2gVRxzHPwnTalMPQQRthaZQoRQURJGCFhSFHkJzqQcLMQjCgFQPKiIo1qog4h8wBxHprzd7sIeUgtWLUAJWELSgCGpvCkYRQaI+TchbSA/z27y8zdvdmd33XuIXwjCb2czvu5+Z2ZnfpmNycpKyiqztBv4AVgHzgApwEvjViIyW7sBDHU0y8gJY1OBXFeAusMuI3CndUYZKG4ms3Qec1uoYcBP4DFgKzNfrE8Br4KQROVOqwxR1NuFvHNByHFhrRDYakWXAV8AQ8A74EEfsdGTt/Sb0OUOliCRo3DAi32S0OwAs1EvXjMi3hTtuoLJEftZyHNia1kiH0ybglV5aU7LfGSpsRJ/yAq3+a0QeZbXXyV7V6pui/aapDJFDWmbSiKXG45Xt7xL9NlQhI5G1/cBHWs2loYoXhQngSJF+s1SUyHHcShRCI57otzyNB8mE3hBZ+x3wiVZ9aRzWMtV4ZO1hYE9oPEAH0BdsBDhHGI1+3LYFUoxH1n4O/ESBB6u6GjS0CtLIHYb6dwZwy/No4M9zoDf0CUyncSinbZBxI3IJuBQYz5S8iUTWbsDtnwAeG5Fhj9uCjJdRyNC6gBvD48COvMZK41OtPvc0XlheRnQy9mh1xDOoM8AHuPfGriLBhciXyG+4LXkE7M5rHFm7kprxZ0bkr2Lh+SvXiNJYrdURz6DO4Yy3hQb4EYlpVPEIKmG8LTQgx0giqKeeQcXGAU4VDy1MeUTioLyGiBr/WqsVI3K+VHQBSjWiQcUHIN8hEi/RAEfLhRamrDf7BdzLzJdGN7Beqy/Tkgz6gP4BPg6KNF1vgeUNjWhQ67TqS2OQ2tw4kdHuHrWTZTPUDdxJIzKonYXQ2KzVVBqqXuAyUD6hpt0DAzOMJIIKoRE/5YtZDY3IddxTbKoaTfYiNLZodZwWHGN9VGekII0j1ObG7+3K9SaVJBJEQzWgZQWPfVirNGUkQWPMh0YiqTA0WzSgnsheajQOet4fp3hmlQbUG9mp5ZjP1qJBimfWaIAaSQTlSyPO+04A25scV7BiIlNDxJPGj7jtC7Qo4RaqzgQN343efgJyW+1QJ/U0cr8mFcxttVyG2svMl0ZuplGX8ovAirIBeuieEekzuMnaBdzOuyNB40FK+rMbeAgsbl6smeqJrH0Smo0fxNGoUktM10mX4WFqH3VarSrwp3fKVFM8caYx8/xuRH7Q9k3f5TbQqBFJPY/UadqY9z6/t/q7elI+ea1+YARYrpfaluIJUSoRpXAd+BKX+gR4DGxofVjhSjuzH8N9PYpPfRXgrBFpOMHnguqMaIZjGFiC+8pUBf4D+ubKiy9N041c0Xq8h3oH7DEiv7Q9qgKabqRLywg3N76f7a15iAz1Zl4C2+biqpSnTtycGMX9J88X76MJgP8B0V6EcbWQ7QAAAAAASUVORK5CYII="
  },
  {
    title: '竞拍记录',
    path: "/pages/bidding-record/index",
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAAEJUlEQVRogdWaT2gVRxzHPwnTalMPQQRthaZQoRQURJGCFhSFHkJzqQcLMQjCgFQPKiIo1qog4h8wBxHprzd7sIeUgtWLUAJWELSgCGpvCkYRQaI+TchbSA/z27y8zdvdmd33XuIXwjCb2czvu5+Z2ZnfpmNycpKyiqztBv4AVgHzgApwEvjViIyW7sBDHU0y8gJY1OBXFeAusMuI3CndUYZKG4ms3Qec1uoYcBP4DFgKzNfrE8Br4KQROVOqwxR1NuFvHNByHFhrRDYakWXAV8AQ8A74EEfsdGTt/Sb0OUOliCRo3DAi32S0OwAs1EvXjMi3hTtuoLJEftZyHNia1kiH0ybglV5aU7LfGSpsRJ/yAq3+a0QeZbXXyV7V6pui/aapDJFDWmbSiKXG45Xt7xL9NlQhI5G1/cBHWs2loYoXhQngSJF+s1SUyHHcShRCI57otzyNB8mE3hBZ+x3wiVZ9aRzWMtV4ZO1hYE9oPEAH0BdsBDhHGI1+3LYFUoxH1n4O/ESBB6u6GjS0CtLIHYb6dwZwy/No4M9zoDf0CUyncSinbZBxI3IJuBQYz5S8iUTWbsDtnwAeG5Fhj9uCjJdRyNC6gBvD48COvMZK41OtPvc0XlheRnQy9mh1xDOoM8AHuPfGriLBhciXyG+4LXkE7M5rHFm7kprxZ0bkr2Lh+SvXiNJYrdURz6DO4Yy3hQb4EYlpVPEIKmG8LTQgx0giqKeeQcXGAU4VDy1MeUTioLyGiBr/WqsVI3K+VHQBSjWiQcUHIN8hEi/RAEfLhRamrDf7BdzLzJdGN7Beqy/Tkgz6gP4BPg6KNF1vgeUNjWhQ67TqS2OQ2tw4kdHuHrWTZTPUDdxJIzKonYXQ2KzVVBqqXuAyUD6hpt0DAzOMJIIKoRE/5YtZDY3IddxTbKoaTfYiNLZodZwWHGN9VGekII0j1ObG7+3K9SaVJBJEQzWgZQWPfVirNGUkQWPMh0YiqTA0WzSgnsheajQOet4fp3hmlQbUG9mp5ZjP1qJBimfWaIAaSQTlSyPO+04A25scV7BiIlNDxJPGj7jtC7Qo4RaqzgQN343efgJyW+1QJ/U0cr8mFcxttVyG2svMl0ZuplGX8ovAirIBeuieEekzuMnaBdzOuyNB40FK+rMbeAgsbl6smeqJrH0Smo0fxNGoUktM10mX4WFqH3VarSrwp3fKVFM8caYx8/xuRH7Q9k3f5TbQqBFJPY/UadqY9z6/t/q7elI+ea1+YARYrpfaluIJUSoRpXAd+BKX+gR4DGxofVjhSjuzH8N9PYpPfRXgrBFpOMHnguqMaIZjGFiC+8pUBf4D+ubKiy9N041c0Xq8h3oH7DEiv7Q9qgKabqRLywg3N76f7a15iAz1Zl4C2+biqpSnTtycGMX9J88X76MJgP8B0V6EcbWQ7QAAAAAASUVORK5CYII="
  },
  {
    title: '上传广告',
    path: "/pages/upload-ad/index",
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAAEJUlEQVRogdWaT2gVRxzHPwnTalMPQQRthaZQoRQURJGCFhSFHkJzqQcLMQjCgFQPKiIo1qog4h8wBxHprzd7sIeUgtWLUAJWELSgCGpvCkYRQaI+TchbSA/z27y8zdvdmd33XuIXwjCb2czvu5+Z2ZnfpmNycpKyiqztBv4AVgHzgApwEvjViIyW7sBDHU0y8gJY1OBXFeAusMuI3CndUYZKG4ms3Qec1uoYcBP4DFgKzNfrE8Br4KQROVOqwxR1NuFvHNByHFhrRDYakWXAV8AQ8A74EEfsdGTt/Sb0OUOliCRo3DAi32S0OwAs1EvXjMi3hTtuoLJEftZyHNia1kiH0ybglV5aU7LfGSpsRJ/yAq3+a0QeZbXXyV7V6pui/aapDJFDWmbSiKXG45Xt7xL9NlQhI5G1/cBHWs2loYoXhQngSJF+s1SUyHHcShRCI57otzyNB8mE3hBZ+x3wiVZ9aRzWMtV4ZO1hYE9oPEAH0BdsBDhHGI1+3LYFUoxH1n4O/ESBB6u6GjS0CtLIHYb6dwZwy/No4M9zoDf0CUyncSinbZBxI3IJuBQYz5S8iUTWbsDtnwAeG5Fhj9uCjJdRyNC6gBvD48COvMZK41OtPvc0XlheRnQy9mh1xDOoM8AHuPfGriLBhciXyG+4LXkE7M5rHFm7kprxZ0bkr2Lh+SvXiNJYrdURz6DO4Yy3hQb4EYlpVPEIKmG8LTQgx0giqKeeQcXGAU4VDy1MeUTioLyGiBr/WqsVI3K+VHQBSjWiQcUHIN8hEi/RAEfLhRamrDf7BdzLzJdGN7Beqy/Tkgz6gP4BPg6KNF1vgeUNjWhQ67TqS2OQ2tw4kdHuHrWTZTPUDdxJIzKonYXQ2KzVVBqqXuAyUD6hpt0DAzOMJIIKoRE/5YtZDY3IddxTbKoaTfYiNLZodZwWHGN9VGekII0j1ObG7+3K9SaVJBJEQzWgZQWPfVirNGUkQWPMh0YiqTA0WzSgnsheajQOet4fp3hmlQbUG9mp5ZjP1qJBimfWaIAaSQTlSyPO+04A25scV7BiIlNDxJPGj7jtC7Qo4RaqzgQN343efgJyW+1QJ/U0cr8mFcxttVyG2svMl0ZuplGX8ovAirIBeuieEekzuMnaBdzOuyNB40FK+rMbeAgsbl6smeqJrH0Smo0fxNGoUktM10mX4WFqH3VarSrwp3fKVFM8caYx8/xuRH7Q9k3f5TbQqBFJPY/UadqY9z6/t/q7elI+ea1+YARYrpfaluIJUSoRpXAd+BKX+gR4DGxofVjhSjuzH8N9PYpPfRXgrBFpOMHnguqMaIZjGFiC+8pUBf4D+ubKiy9N041c0Xq8h3oH7DEiv7Q9qgKabqRLywg3N76f7a15iAz1Zl4C2+biqpSnTtycGMX9J88X76MJgP8B0V6EcbWQ7QAAAAAASUVORK5CYII="
  }*/
]


/**
 * @module 营销推广
 */
const shares = [
  {
    title: '小程序码',
    use: "code",
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAABt0lEQVRoge1ZwXHCMBBcZ/RPSnAJdGBTSXhYdcTUcR86idKBS3AJ5I1nnAcecmiMQfiEPDfelzBiVwvn4+6c9X0PDchOVVUK8h0NUcMvdNbyb2pviGr23geAjYSwAfAtQTTgB0AZsH8jpf8mQbIEqDFivNdbQ+RCCDprawBfIochygJ0S7CwVPuLxMCWrdtYItGNhIbq0zqxBTprHXt5MESHGDqvCK2CrV0sETU3+2pkaViNLA1qjLwi/T4Mr3cJgm9kNxRjIQjdHwW+kc8kpxBA6tBqcF1UPg2Dc3sqheb+FiZOdIRQ2WIMUSlBlBp60u/Qqo7hYIha4NLOiqOzNgewk+AyuN1vO/x3dCI9+QhyKW49oYXbWevI1lKZrR3REOHOtMx+1YRWdqqqWojrkuU4vIzn+FRlRtZy/nRmKmsFk2N8buXz8wPkM/Q5j57Q4kXjLwJrJZwfC7zLHWcyg01qcSNNaN01DN+Ke/sexZT+PS01obUaWRpWI0uDGiOphw9X8J6l+Jh8Hr8oI5jxn7SGlhBaAPsnPuf8C0mNDGV/LcLF1sWcIXJqrPdIAPg94GKJqBk+/AHUN3TsLOjUDQAAAABJRU5ErkJggg=="
  }
]


/**
 * @module 管理审核
 */
const audit = [
  {
    title: '商品审核',
    path: "/pages/audit/index",
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAABqElEQVRoge2ZwW3CQBQFx5bvoYOkBHcAVEA6CAfvGUpwBzHnvaQEUkFcAukg6QDOWHIOgBRboCjxvi/H8pywhMZ62sX7/ImOWZYCW+CesGwS79eBnTeJ0YQAWFXOmQZRhLjwKHQ3SBoX3kddhZVzM+Ctq+e3xNY3VJH8/JUwVM6lQA5MBPqtWRCgAKYi99Rya+2E7oPZiiTeryvntiL9znJrkXhfqtyDeWqNQfrGGKRvDCaIZUWZAKlI/2FdUZ5E7oPl1lKUxQt3liuSo+tbzYpyfinqytXfQeL9DmFxbK9I6De7fWDfTWJgI/QXQneDqK5rKudyYBbQuwcKZdttE9V1bXUvKcM62c+DtJAzKPutdcyyAliJ/HOrMDG6EABmI9P2OTIP4EyB5/NnZS1p0B6Zll2FlXNdFX/CssYvOfUtxdD81fLxu0Q3+V9YBlEN5wDeLSeNBcLuNZiTfQzSN8YgfWMM0jcsK8oDp9Ndgek/VgWwUMktt5Z0NGS5ImvgReS2G2In3u+BUub/flE5929nQzHwKfSXQneDmNMYSBFmk3ifC7xX+QIn7V+jxCaylwAAAABJRU5ErkJggg=="
  },
  {
    title: '店铺审核',
    path: "/pages/audit-store/index",
    ico: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAABqElEQVRoge2ZwW3CQBQFx5bvoYOkBHcAVEA6CAfvGUpwBzHnvaQEUkFcAukg6QDOWHIOgBRboCjxvi/H8pywhMZ62sX7/ImOWZYCW+CesGwS79eBnTeJ0YQAWFXOmQZRhLjwKHQ3SBoX3kddhZVzM+Ctq+e3xNY3VJH8/JUwVM6lQA5MBPqtWRCgAKYi99Rya+2E7oPZiiTeryvntiL9znJrkXhfqtyDeWqNQfrGGKRvDCaIZUWZAKlI/2FdUZ5E7oPl1lKUxQt3liuSo+tbzYpyfinqytXfQeL9DmFxbK9I6De7fWDfTWJgI/QXQneDqK5rKudyYBbQuwcKZdttE9V1bXUvKcM62c+DtJAzKPutdcyyAliJ/HOrMDG6EABmI9P2OTIP4EyB5/NnZS1p0B6Zll2FlXNdFX/CssYvOfUtxdD81fLxu0Q3+V9YBlEN5wDeLSeNBcLuNZiTfQzSN8YgfWMM0jcsK8oDp9Ndgek/VgWwUMktt5Z0NGS5ImvgReS2G2In3u+BUub/flE5929nQzHwKfSXQneDmNMYSBFmk3ifC7xX+QIn7V+jxCaylwAAAABJRU5ErkJggg=="
  }
]


const { recommendGoods, user, storeCount, shopFind, qrCode } = require('../../utils/server.js')
const { uploadInfo, isDisabled } = require("../../utils/util.js");

const { baseImgUrl, baseurl } = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners,
    routes, // 用户信息
    routes1, // 用户信息二
    setUp, // 管理设置
    shares, // 店铺分享
    audit, // 店铺管理
    nearData: [], // 为你优选
    disabled: true,
    store_id: '', // 店铺id
    avatarUrl: '',  // 个人头像
    nickName: '', // 个人姓名
    shopInfo: {}, // 店铺信息
    is_pass: null, // 店铺是否审核通过
    isFirst: true, // 是否首次进入
    audit_auth: 0, // 是否拥有后台权限 0无  1有
    relatedData: [
      {
        title: '浏览',
        num: 0
      },
      {
        title: '收藏',
        num: 0
      },
      {
        title: '关注',
        num: 0
      }
    ], // 访问信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUnionId();
    this.getUser();
  },

  /**
   * @module 获取店铺信息
   */
  getShopInfo() {

    const { store_id, unionId } = this.data;
    const data = { store_id, unionId }

    console.log(store_id, unionId)
    shopFind(data)
      .then(res => {
        this.setShopInfo(res);
      })
      .catch(err => {
        console.log(err)
      })
  },

  /**
   * @module 获取店铺信息
   */
  setShopInfo(res) {
    let { data: shopInfo, data: { store_banner, merchant_code } } = res;

    store_banner = (store_banner && store_banner.length) ? store_banner : banners;

    if (merchant_code) {
      
      if (merchant_code.indexOf(baseurl) == -1) {
        setUp[2].meta = `${baseurl}${merchant_code}`
      } else {
        setUp[2].meta = merchant_code
      }
    }

    wx.setStorageSync('shopInfo', shopInfo)
    this.setData({ shopInfo, banners: store_banner, setUp })
  },

  /**
   * @module 获取店铺id
   */
  getStoreId() {
    const { store_id, is_pass } = this.data;

    if (store_id && is_pass === 1) {
      this.setData({ store_id })
      return true
    }

    return false;
  },

  /**
   * @module 获取unionId
   */
  getUnionId() {
    const unionId = wx.getStorageSync('unionId')

    this.setData({ unionId })
  },

  /**
    * @module  获取个人中心数据
  */
  getUser() {
    const { unionId } = this.data;
    const data = { unionId }

    if (!unionId) {
      return;
    }

    user(data)
      .then(res => {
        if (unionId) {
          this.setInfo(res);
        }
      })
      .catch(err => {
        console.log(err)
      })
  },

  /**
   * @module 设置个人信息
   */
  setInfo({ data }) {
    const { avatarUrl, nickName, store_id, is_pass } = data[0];
    const { collect, focus, swa, audit_auth } = data;

    routes1[0].is_pass = is_pass;

    if (is_pass === 2) {
      routes1[0].title = '再次申请'
    } else if (is_pass === 0) {
      routes1[0].title = '店铺'
    } 

    wx.setStorageSync('storeid', store_id)

    if (store_id && is_pass === 1) {
      this.setData({ store_id })
      this.getAdData();
      this.getStoreCount();
      this.getShopInfo();
    } else {
      const relatedData = [
        {
          title: '浏览',
          num: swa
        },
        {
          title: '收藏',
          num: collect
        },
        {
          title: '关注',
          num: focus
        }
      ] // 访问信息

      this.setData({ avatarUrl, nickName, relatedData, store_id: '', shopInfo: {}, banners })
    }

    this.setData({ routes1, is_pass, audit_auth })
  },

  /**
   * @module 获取店铺统计
   */
  getStoreCount() {

    const { store_id } = this.data;
    const data = { store_id }

    storeCount(data)
      .then(({ data }) => {
        this.setStorecount(data)
      })
      .catch(err => {
        console.log(err)
      })
  },

  /**
   * @module 设置店铺统计
   */
  setStorecount({ swa, people, focus }) {

    const relatedData = [
      {
        title: '总访问量',
        num: swa
      },
      {
        title: '累计访客',
        num: people
      },
      {
        title: '粉丝',
        num: focus
      }
    ]

    this.setData({ relatedData })
  },

  /**
  *  @module 获取广告位
  */
  getAdData() {

    const { store_id } = this.data;
    const data = { cate_id: store_id }
    recommendGoods(data)
      .then(({ data }) => {
        console.log(data)
        this.setData({ nearData: data })
      })
      .catch(err => {
        console.log(err)
      })
  },

  /**
   * @module 获取用户信息
   */
  bindgetuserinfo(e) {
    const { iv, encryptedData } = e.detail;

    uploadInfo({ iv, encryptedData }, () => {
      this.getUnionId();
      const { unionId } = this.data;

      if (unionId) {
        this.getUser();
      }
    })

  },

  /**
   * @module 获取小程序码
   */
  getCode() {
    const { shopInfo: { store_id }, unionId, codeImage } = this.data;
    const data = { unionId, id: store_id, type: 2 }

    if (codeImage) {

      wx.previewImage({
        current: codeImage,
        urls: [codeImage]
      })
      return;
    }

    qrCode(data)
      .then(({ data }) => {
        const codeImage = baseImgUrl + data;

        this.setData({ codeImage })
        wx.previewImage({
          current: codeImage,
          urls: [codeImage]
        })

      })
      .catch(err => {
        console.log(err)
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.setData({ disabled: true })

    const { isFirst } = this.data;

    if (!isFirst) {
      this.getUser();
    }

    this.setData({ isFirst: false })
  },

  /**
   * @module 组织冒泡
   */
  bubbleHandler() {

  },

  /**
   * @module  生命周期函数  分享 
   */
  onShareAppMessage(e) {
    const { shopInfo: storeInfo, store_id } = this.data;

    let imageUrl = '';

    let title = '壹城好店'
    let path = `/pages/home/index`

    if (e.from === 'button') {
      title = storeInfo.store_name;
      path = `/pages/stores/details/details?store_id=${store_id}&share=1`;
      imageUrl = storeInfo.store_head;
    }

    return {
      title,
      path,
      imageUrl
    }
  }
})