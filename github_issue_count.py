import os
import requests
import discord
from discord.ext import tasks

# GitHub API 토큰 및 디스코드 봇 토큰 설정
GITHUB_TOKEN = os.environ["GITHUB_TOKEN"]
DISCORD_TOKEN = os.environ["DISCORD_TOKEN"]
DISCORD_CHANNEL_ID = os.environ["DISCORD_CHANNEL_ID"]

# 디스코드 클라이언트 생성
client = discord.Client()

@tasks.loop(hours=24)  # 매일 오전 9시에 실행하도록 설정
async def send_github_issue_count():
    # GitHub API를 사용하여 이슈 가져오기
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}"
    }
    response = requests.get("https://api.github.com/repos/OWNER/REPO/issues", headers=headers)

    if response.status_code == 200:
        issues = response.json()
        assignee_count = {}
        for issue in issues:
            assignee = issue["assignee"]["login"] if issue["assignee"] else "Unassigned"
            if assignee in assignee_count:
                assignee_count[assignee] += 1
            else:
                assignee_count[assignee] = 1

        # 디스코드로 보내기
        channel = client.get_channel(int(DISCORD_CHANNEL_ID))  # 디스코드 채널 ID를 정수로 변환
        for assignee, count in assignee_count.items():
            await channel.send(f"{assignee}: {count}개의 이슈")

@client.event
async def on_ready():
    print(f'Logged in as {client.user}')

# 봇 실행
send_github_issue_count.start()
client.run(DISCORD_TOKEN)
