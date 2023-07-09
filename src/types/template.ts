export interface TemplatesResponse {
    TotalCount: number
    LaunchTemplateSets: LaunchTemplateSets
    PageSize: number
    RequestId: string
    PageNumber: number
}

export interface LaunchTemplateSets {
    LaunchTemplateSet: LaunchTemplateSet[]
}

export interface LaunchTemplateSet {
    LaunchTemplateName: string
    CreatedBy: string
    ModifiedTime: string
    ResourceGroupId: string
    LatestVersionNumber: number
    CreateTime: string
    LaunchTemplateId: string
    DefaultVersionNumber: number
}
