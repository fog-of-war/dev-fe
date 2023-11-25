async def send_github_issue_count_once():
    # GitHub API를 사용하여 이슈 가져오기
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}"
    }
    response = requests.get("https://api.github.com/repos/fog-of-war/dev-fe/issues", headers=headers)
       
    if response.status_code == 200:
        issues = response.json()
        
        # 이슈가 없으면 메시지를 보내지 않고 함수 종료
        if not issues:
            return

        assignee_count = {}
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
            code_block = "```md\n"
            for issue in issues:
                if issue["assignee"] and issue["assignee"]["login"] == assignee:
                    issue_title = issue["title"]
                    code_block += f"{issue_title}\n"
            code_block += "```"
            message += code_block
            message += "\n"

        await channel.send(message)
