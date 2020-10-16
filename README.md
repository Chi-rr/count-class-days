# count-class-days
Calculate your lecture attendance based on Google Calendar.

## Requirement
Please save your lecture attendance, absences and cancelled information in this format in your Google Calendar.

- attendance：`subject：●`
- absences：`subject：×`
- cancelled：`subject：休`

<img width="479" alt="スクリーンショット 2020-10-16 11 01 01" src="https://user-images.githubusercontent.com/52053239/96204416-3a769a00-0f9f-11eb-9424-6b07b4e7112a.png">


## Install

```sh
$ npm install count-class-days
```

## Usage
### 1.Saving Service Account Key Files

Please prepare a private key file (JSON format) for a service account that uses Google Calender API, and save it with the file name `.count-class-days-secret-key.json` under your home directory.

※ The path should be `~/.count-class-days-secret-key.json`.

### 2.Reading Calendar URL and ID

Please specify the "Public URL" and "Calendar ID" of Google Calender to be accessed as follows.

```sh
$ count-class-days -u "CalendarURL" -i "CalendarID"
```

※ If you make a mistake, please try again.  

### 3. You can do it
```sh
$ count-class-days

✔ 対象期間の初日を入力してください(例：2020-10-01) · 2020-10-01
✔ 対象期間の最終日を入力してください(例：2020-12-31) · 2020-10-31
✔ 科目を入力してください · 英語
出席：1
欠席：0
休講：1
```

## License
MIT

## reference
- [Google Cloud Console APIs](https://console.developers.google.com/apis)

- [API Documentation](https://cloud.google.com/apis/docs/overview)