import os
import requests
import discord
import asyncio  # asyncio 모듈을 가져옵니다.

# GitHub API 토큰 및 디스코드 봇 토큰 설정
GITHUB_TOKEN = os.environ["GITHUB_TOKEN"]
DISCORD_BOT_TOKEN = os.environ["DISCORD_BOT_TOKEN"]
DISCORD_CHANNEL_ID = os.environ["DISCORD_CHANNEL_ID"]

client = discord.Client(intents=discord.Intents.default())

async def send_github_issue_count():
    await client.wait_until_ready()  # 봇이 완전히 준비될 때까지 기다립니다.

    while not client.is_closed():
        # GitHub API를 사용하여 이슈 가져오기
        headers = {
            "Authorization": f"token {GITHUB_TOKEN}"
        }
        response = requests.get("https://api.github.com/repos/fog-of-war/dev-fe/issues", headers=headers)
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

        await asyncio.sleep(60)  # 24시간(하루) 대기 후에 다시 실행

@client.event
async def on_ready():
    print(f'Logged in as {client.user}')

# 봇 실행
client.loop.create_task(send_github_issue_count())
client.run(DISCORD_BOT_TOKEN)
