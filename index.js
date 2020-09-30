const Discord = require("discord.js");
const client = new Discord.Client();
process.setMaxListeners(15);

client.on("ready", () => {
  console.log("켰다.");
});

client.on("message", (message) => {
  if (message.author.bot) return;

  if (message.content == "ping") {
    return message.reply("pong");
  }

  if (message.content.startsWith("?청소")) {
    if (checkPermission(message)) return;

    var clearLine = message.content.slice("?청소 ".length);
    var isNum = !isNaN(clearLine);

    if (isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("`1`부터 `100`까지의 숫자만 입력해주세요. [루피봇]");
      return;
    } else if (!isNum) {
      
      if (message.content.split("<@").length == 2) {
        if (isNaN(message.content.split(" ")[2])) return;

        var user = message.content.split(" ")[1].split("<@!")[1].split(">")[0];
        var count = parseInt(message.content.split(" ")[2]) + 1;
        const _limit = 10;
        let _cnt = 0;

        message.channel.fetchMessages({ limit: _limit }).then((collected) => {
          collected.every((msg) => {
            if (msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel
        .bulkDelete(parseInt(clearLine) + 1)
        .then(() => {
          AutoMsgDelete(
            message,
            `<@${message.author.id}> ` +
              parseInt(clearLine) +
              "개의 메시지를 삭제했습니다! (이 메세지는 잠시 후에 사라집니다) [루피봇]"
          );
        })
        .catch(console.error);
    }
  }
});

function checkPermission(message) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(
      `<@${message.author.id}> ` +
        "명령어를 수행할 관리자 권한을 소지하고 있지않습니다. [루피봇]"
    );
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for (let i = 0; i < limitLen; i++) {
    tmp += " ";
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}

client.on("message", (message) => {
  if (message.content === "?명령어") {
    message.reply("명령어 :");
    message.channel.send("> https://sites.google.com/view/roopiebot/%EB%AA%85%EB%A0%B9%EC%96%B4");
    message.channel.send("> 명령어는 이 사이트에서 확인하세요!");
  }
});

client.on("message", (message) => {
  if (message.content === "?초대링크") {
    message.reply(
      "초대링크입니다! https://discord.com/api/oauth2/authorize?client_id=757185362513887233&permissions=0&scope=bot"
    );
  }
});

client.on("message", (message) => {
  if (message.content === "?사이트") {
    message.reply(
      "루피봇사이트입니다! http://roopiebot.kro.kr/ "
    );
  }
});

client.on("message", (message) => {
  if (message.content === "?최저가니트로") {
    message.reply(
      "https://discord.gg/UWhtCXV 홍보도 같이 해주세용^^"
    );
  }
});

client.on("message", (message) => {
  if (message.content === "?공식디코") {
    message.reply(
      "https://discord.gg/rNdcxae 홍보도 같이 해주세용^^"
    );
  }
});



client.login(process.env.token);
