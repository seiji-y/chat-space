class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user) # グループ所属の全メッセージ。includesはn+1問題用
  end

  def create
    @message = @group.messages.create(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(params[:group_id]) }
        format.json
      end
      flash[:notice] = 'メッセージを送信しました'
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = "メッセージは送信されませんでした"
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
