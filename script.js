
getLocation()
let lat, lon
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude
      lon = position.coords.longitude
      //แสดง lat long ใน textbox
      document.getElementById("latlong").value = lat + ',' + lon;
    });
  }
}


async function getIpLocation(ip) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    alert(data.status);
    return data; // เปลี่ยนจากการส่งข้อความเป็นการส่งข้อมูล IP
  } catch (error) {
    console.error('Error fetching IP location:', error);
    throw error;
  }
}


async function sendFlexBot() {
  try {
    const ipData = await getIpLocation(txtbot); // เรียกใช้ getIpLocation เพื่อดึงข้อมูล IP
    const ipMessage = `
      IP Address: ${ipData.query}
      📍ประเทศ: ${ipData.country} : ${ipData.countryCode}
      📍พื้นที่: ${ipData.region} : ${ipData.regionName}
      📍เมือง: ${ipData.city}
      📍Timezone: ${ipData.timezone}
      📍ผู้ให้บริการ: ${ipData.isp}
      📍Org: ${ipData.org}
      📍As: ${ipData.as}
      📍https://maps.google.com?q=${ipData.lat},${ipData.lon}`;

    var flexMessage = {
      "type": "flex",
      "altText": "ระบบตอบกลับ",
      "contents": {
        "type": "bubble",
        "header": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "ผลการค้นหา",
              "weight": "bold",
              "size": "xl",
              "align": "center"
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "icon",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                },
                {
                  "type": "text",
                  "text": 'San Bot',
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            }
          ]
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "margin": "lg",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "Results",
                  "color": "#aaaaaa",
                  "size": "sm",
                  "flex": 1
                },
                {
                  "type": "text",
                  "text": `${ipMessage}`,//ผล
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            },
            {
              "type": "separator"
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "separator"
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "San BOT",
                "uri": "http://line.me/ti/p/~@223zypdp",
              },
              "color": "#00FF66"
            },
          ],
          "flex": 0
        },
        "styles": {
          "header": {
            "backgroundColor": "#99FFFF"
          }
        }
      }
    }
    await liff.sendMessages([flexMessage])
      .then(() => {
        liff.closeWindow();
      })
      .catch((err) => {
        console.error('Error sending message:', err);
      });
  } catch (error) {
    console.error('Error occurred:', error);
  }
}


