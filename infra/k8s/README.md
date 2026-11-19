# Kubernetes Starter Reference Manifests (Item 20)

**Status**: `SKIPPED` (Reference Only — Do NOT Deploy)  

---

## 1. Why Kubernetes is Skipped for Resoline.in
1. **Edge-Static Architecture**: Resoline.in is a high-performance marketing and lead generation web application. Edge deployment on Vercel / Cloudflare provides sub-50ms global latency with zero server management overhead.
2. **Infrastructure Cost**: A managed Kubernetes cluster (EKS, GKE, or AKS) has a baseline cost of $70–$150/month purely for control plane and minimum worker nodes, whereas edge static hosting is virtually free or low-cost for B2B traffic.
3. **Operational Complexity**: Maintaining ingress controllers, TLS cert-manager renewals, node upgrades, and pod resource limits creates unnecessary maintenance burden without providing higher uptime than global CDN anycast routing.

---

## 2. Conditions Under Which Kubernetes Becomes Worthwhile
Transitioning to this Kubernetes starter kit is justified ONLY when all of the following conditions are met:
1. **High Concurrency**: Sustained traffic exceeds 50,000 requests/second requiring dedicated backend stateful clusters.
2. **Internal Enterprise Microservices**: Resoline deploys proprietary backend engineering software (e.g. real-time SCADA telemetry ingestion, massive plant digital twins, or internal ERP modules) that must run in an isolated VPC.
3. **Dedicated DevOps Staff**: The organization has dedicated infrastructure engineers to monitor and maintain the cluster 24/7.

---

## 3. How to Deploy (When Conditions Are Met)
```bash
# 1. Apply config and secrets
kubectl apply -f infra/k8s/k8s-bundle.yaml

# 2. Apply deployment
kubectl apply -f infra/k8s/deployment.yaml

# 3. Verify pod status
kubectl get pods -l app=resoline-web
```
