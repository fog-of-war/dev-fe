import os
import requests
import discord
from discord.ext import commands, tasks
import time
from datetime import datetime

# GitHub API 토큰 및 디스코드 봇 토큰 설정
GITHUB_TOKEN = os.environ["GITHUB_TOKEN"]
DISCORD_BOT_TOKEN = os.environ["DISCORD_BOT_TOKEN"]
DISCORD_CHANNEL_ID = os.environ["DISCORD_CHANNEL_ID"]

client = discord.Client(intents=discord.Intents.default())

async def send_github_issue_count_once():
    # GitHub API를 사용하여 이슈 가져오기
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}"
    }
    response = requests.get("https://api.github.com/repos/fog-of-war/dev-fe/issues", headers=headers)
    if response.status_code == 200:
        issues = response.json()
        assignee_count = {}
        issue_messages = []  # 이슈 정보를 담을 리스트
        current_date = datetime.now().strftime("%Y-%m-%d")

        for issue in issues:
            assignee = issue["assignee"]["login"] if issue["assignee"] else "담당자 없음"
            if assignee in assignee_count:
                assignee_count[assignee] += 1
            else:
                assignee_count[assignee] = 1

        # 디스코드로 보내기
        channel = client.get_channel(int(DISCORD_CHANNEL_ID))  # 디스코드 채널 ID를 정수로 변환

        # 메시지 생성
        message = f"## 📅 **{current_date}**\n "
        for assignee, count in assignee_count.items():
            message += f"💡 **{assignee}**: {count}개의 이슈가 남아있습니다.\n"
            # message += f"https://github.com/fog-of-war/dev-fe/issues/assigned/{assignee}\n"
            # Collect issue titles within a single code block
            code_block = "```md\n"
            for issue in issues:
                if issue["assignee"] and issue["assignee"]["login"] == assignee:
                    issue_title = issue["title"]
                    code_block += f"{issue_title}\n"
            code_block += "```"
            
            message += code_block
            message += "\n"


        await channel.send(message)

@client.event
async def on_ready():
    print(f'Logged in as {client.user}')
    
    # 봇 실행 후 한 번만 작업 실행
    await send_github_issue_count_once()
    
    # 작업이 완료되면 봇 종료
    await client.close()

# 봇 실행
client.run(DISCORD_BOT_TOKEN)

