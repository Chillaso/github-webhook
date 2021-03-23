{{/*
Expand the name of the chart.
*/}}
{{- define "github-webhook.name" -}}
{{- printf "%s-%s" .Chart.Name .Values.instance | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "github-webhook.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "github-webhook.labels" -}}
helm.sh/chart: {{ include "github-webhook.chart" . }}
{{ include "github-webhook.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "github-webhook.selectorLabels" -}}
app.kubernetes.io/name: {{ include "github-webhook.name" . }}
app.kubernetes.io/instance: {{ .Values.instance }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "github-webhook.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "github-webhook.name" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}
