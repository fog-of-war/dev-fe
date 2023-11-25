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

        # 이슈가 없는 경우 메시지를 보내지 않고 함수를 종료합니다.
        if not issues:
            return

        assignee_count = {}
        current_date = datetime.now().strftime("%Y-%m-%d")

        for issue in issues:
            # 담당자 목록을 가져옵니다.
            assignees = issue.get("assignees", [])
            if assignees:
                for assignee in assignees:
                    assignee_login = assignee["login"]
                    if assignee_login in assignee_count:
                        assignee_count[assignee_login] += 1
                    else:
                        assignee_count[assignee_login] = 1
            else:
                # 담당자가 없는 경우
                no_assignee = "담당자 없음"
                if no_assignee in assignee_count:
                    assignee_count[no_assignee] += 1
                else:
                    assignee_count[no_assignee] = 1

        # 디스코드로 보내기
        channel = client.get_channel(int(DISCORD_CHANNEL_ID))

        # 메시지 생성
        message = f"## 📅 **{current_date}**\n "
        for assignee, count in assignee_count.items():
            message += f"💡 **{assignee}**: {count}개의 이슈가 남아있습니다.\n"
            # Collect issue titles within a single code block
            code_block = "```md\n"
            for issue in issues:
                if issue.get("assignees"):
                    for issue_assignee in issue["assignees"]:
                        if issue_assignee["login"] == assignee:
                            issue_title = issue["title"]
                            code_block += f"{issue_title}\n"
                            break  # 현재 이슈에 대한 정보를 추가했으므로 루프 중단
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
