"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Token } from "@/types/token"


interface TokenViewModalProps {
  isOpen: boolean
  token: Token | null
  onClose: () => void
}

export default function TokenViewModal({ isOpen, token, onClose }: TokenViewModalProps) {
  if (!token) return null

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleString()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Token Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Account Status</h3>
            <Badge variant={token.is_active ? "success" : "secondary"}>{token.is_active ? "Active" : "Inactive"}</Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
              <p className="text-sm">{token.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Created At</h4>
                <p className="text-sm">{formatDate(token.createdAt)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Updated At</h4>
                <p className="text-sm">{formatDate(token.updatedAt)}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Google API Configuration</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Client ID</h4>
                <p className="text-sm break-all">{token.google_client_id || "Not configured"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Client Secret</h4>
                <p className="text-sm">{maskSecret(token.google_client_secret) || "Not configured"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Redirect URI</h4>
                <p className="text-sm break-all">{token.google_redirect_uri || "Not configured"}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Account Configuration</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Publisher IDs</h4>
                {token.publisher_ids && token.publisher_ids.length > 0 ? (
                  <ul className="list-disc pl-5 text-sm">
                    {token.publisher_ids.map((id, index) => (
                      <li key={index}>{id}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No publisher IDs configured</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Currency</h4>
                  <p className="text-sm">{token.currency_code || "Not configured"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Timezone</h4>
                  <p className="text-sm">{token.reporting_time_zone || "Not configured"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Authentication Tokens</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Access Token</h4>
                <p className="text-sm font-mono bg-muted p-2 rounded-md overflow-x-auto">
                  {maskSecret(token.access_token)}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Refresh Token</h4>
                <p className="text-sm font-mono bg-muted p-2 rounded-md overflow-x-auto">
                  {maskSecret(token.refresh_token)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to mask sensitive information
function maskSecret(secret: string): string {
  if (!secret) return ""
  if (secret.length <= 8) return "•".repeat(secret.length)
  return secret.substring(0, 4) + "•".repeat(secret.length - 8) + secret.substring(secret.length - 4)
}
